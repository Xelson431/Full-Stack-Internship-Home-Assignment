package com.csvparser.csvparser;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class ApiController {

    private final CsvParserService csvParserService = new CsvParserService();

    @PostMapping(value = "/api/endpoint", produces = "application/json")
    public ResponseEntity<List<Employee>> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try{
            csvParserService.parseCsv(file);
        List<Employee> employees = csvParserService.getEmployees();

        return ResponseEntity.ok(employees);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }

        
    }
}
