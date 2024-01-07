package com.csvparser.csvparser;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Employee {
    private int id;
    private String employeeName;
    private String jobTitle;
    private double salary;

    public Employee() {
        // Default no-argument constructor (required for Jackson)
    }

    public Employee(int id, String employeeName, String jobTitle, double salary) {
        this.id = id;
        this.employeeName = employeeName;
        this.jobTitle = jobTitle;
        this.salary = salary;
    }

     @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", employeeName='" + employeeName + '\'' +
                ", jobTitle='" + jobTitle + '\'' +
                ", salary=" + salary +
                '}';
    }
    @JsonProperty("id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @JsonProperty("employee_name")
    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    @JsonProperty("job_title")
    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    @JsonProperty("salary")
    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}
