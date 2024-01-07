"use client";
import { useState } from "react";
import ImportCard from "@/components/ImportCard";
import DataTable from "@/components/DataTable";
import SalaryTable from "@/components/SalaryTable";
export default function Home() {
  const [data, setData] = useState([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center align-center ">
      <ImportCard setData={setData} />

      {data.length > 0 ? (
        <div>
          <DataTable data={data} />
          <SalaryTable data={data} />
        </div>
      ) : null}
    </main>
  );
}
