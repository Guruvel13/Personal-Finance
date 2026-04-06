package com.finance.tracker.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    @GetMapping
    public ResponseEntity<?> getDashboardData() {
        // Just stubbing the response to match the shape expected by frontend
        Map<String, Object> response = new HashMap<>();
        response.put("totalIncome", 0);
        response.put("totalExpense", 0);
        response.put("totalBalance", 0);
        return ResponseEntity.ok(response);
    }
}
