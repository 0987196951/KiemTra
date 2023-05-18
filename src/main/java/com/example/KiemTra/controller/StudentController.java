package com.example.KiemTra.controller;

import com.example.KiemTra.model.Book;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Objects;

@Controller
public class StudentController {
    RestTemplate restTemplate = new RestTemplate();
    @GetMapping("/students_gui")
    public String getStudentsGUI(Model model) {
        ResponseEntity<Book[]> response = restTemplate.getForEntity("http://localhost:8080/students", Book[].class);
        model.addAttribute("students", Arrays.asList(Objects.requireNonNull(response.getBody())));
        return "student";
    }

    @GetMapping("/student_gui/{id}")
    public String getStudentsGUIByID(Model model, @PathVariable Long studentID) {
        ResponseEntity<Book> response = restTemplate.getForEntity("http://localhost:8080/student/" + studentID , Book.class);
        model.addAttribute("student", response.getBody());
        return "student_detail";
    }
}
