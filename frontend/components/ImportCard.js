import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const ImportCard = ({ setData }) => {
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
  const handleFormSubmit = async (e) => {
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
      setData(response.data);
    } catch (error) {
      // handle error
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p className="text-center">Csv Parser</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleFormSubmit(e)}>
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
  );
};

export default ImportCard;
