package com.csvparser.csvparser;

import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class CsvParserService {

    private List<Employee> employees = new ArrayList<>();

    public void parseCsv(MultipartFile file) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] values = line.split(",");
                employees.add(new Employee(Integer.parseInt(values[0]), values[1], values[2], Double.parseDouble(values[3])));
                
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Employee> getEmployees() {
        return employees;
    }
}
