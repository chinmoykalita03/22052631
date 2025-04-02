package com.example.affordmed.backend.controller;

import com.example.affordmed.backend.model.WindowResponse;
import com.example.affordmed.backend.service.NumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping ("/numbers")
public class NumberController {
    @Autowired
    private NumberService numberService;

    @GetMapping("/{numberid}")
    public WindowResponse getNumbers(@PathVariable String numberid) {
        return numberService.processNumbers(numberid);
    }
}
