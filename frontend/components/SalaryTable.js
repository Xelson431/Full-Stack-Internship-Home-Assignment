import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const SalaryTable = ({ data }) => {
  const calculateAverageSalaryByJobTitle = () => {
    const result = data.reduce((acc, employee) => {
      const { job_title, salary } = employee;
      acc[job_title] = acc[job_title] || { totalSalary: 0, count: 0 };
      acc[job_title].totalSalary += salary;
      acc[job_title].count++;
      return acc;
    }, {});

    for (const job_title in result) {
      const { totalSalary, count } = result[job_title];
      result[job_title] = totalSalary / count;
    }

    return result;
  };
  const average = calculateAverageSalaryByJobTitle();

  return (
    <div>
      <div className="w-[1000px] mt-5">
        <h2 className="bold text-center">Jobs and their Average Salaries</h2>
        <Table className="outline-8 outline">
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Average Salary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {averageSalaries.map((job) => {
                  <TableRow>
                    <TableCell>{job.job_title}</TableCell>
                    <TableCell>{job.salary}</TableCell>
                  </TableRow>;
                })} */}

            {Object.entries(average).map(([job_title, averageSalary]) => (
              <TableRow key={job_title}>
                <TableCell>{job_title}</TableCell>
                <TableCell>${averageSalary.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SalaryTable;
