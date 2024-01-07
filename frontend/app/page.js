"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
export default function Home() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const [error, setError] = useState(null);
  const handleFileUpload = (event) => {
    const fileType = event.target.files[0].name.split(".").pop();
    if (fileType !== "csv") {
      setError("Please upload a CSV file.");
      return;
    } else {
      setError(null);
    }
    setFile(event.target.files[0]);
  };
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayData(data.slice(startIndex, endIndex));
  }, [currentPage, data, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    console.log(itemsPerPage);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center align-center ">
      <Card>
        <CardHeader>
          <CardTitle>
            <p className="text-center">Csv Parser</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.append("file", file);

              try {
                const response = await axios.post(
                  "http://localhost:8080/api/endpoint",
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
                // handle success
                setData(response.data);
                console.log(response.data);
              } catch (error) {
                // handle error
              }
            }}
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="csv">Import CSV</Label>
              <Input id="csv" type="file" onChange={handleFileUpload} />
              {error ? <p>{error}</p> : null}
              {!error && file ? (
                <Button>Process</Button>
              ) : (
                <Button disabled>Process</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      {displayData.length > 0 ? (
        <div className="w-[1000px] mt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>id</TableHead>
                <TableHead>Employee name</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.employee_name}</TableCell>
                  <TableCell>{employee.job_title}</TableCell>
                  <TableCell>{employee.salary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
              <PaginationItem>
                <Select
                  onChange={(e) => handleItemsPerPageChange(e.target.value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : null}
    </main>
  );
}
