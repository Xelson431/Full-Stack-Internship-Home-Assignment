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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const ImportCard = () => {
  return (
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
              // setData(response.data);
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
  );
};

export default ImportCard;
