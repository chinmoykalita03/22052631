package com.example.affordmed.backend.service;

import com.example.affordmed.backend.model.WindowResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;

@Service
public class NumberService {
    private final RestTemplate restTemplate = new RestTemplate();
    private static final Map<String, String> API_ENDPOINTS = Map.of(
            "p", "http://20.244.56.144/evaluation-service/primes",
            "f", "http://20.244.56.144/evaluation-service/fibo",
            "e", "http://20.244.56.144/evaluation-service/even",
            "r", "http://20.244.56.144/evaluation-service/random"
    );

    @Value("${api.bearer.token}")
    private String bearerToken;
    private final List<Integer> numberWindow = new ArrayList<>();

    public List<Integer> fetchNumbers(String url) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + bearerToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<Map> response = restTemplate.exchange(API_ENDPOINTS.get(url), HttpMethod.GET, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return (List<Integer>) response.getBody().get("numbers");
            }
        } catch (Exception e) {
            System.err.println("Error fetching numbers:  " + url + e.getMessage());
        }
        return Collections.emptyList();
    }

    public WindowResponse processNumbers(String id) {
        List<Integer> newNumbers = fetchNumbers(id);
        List<Integer> prevState = new ArrayList<>(numberWindow);
        for (int num : newNumbers) {
            if (!numberWindow.contains(num)) {
                numberWindow.add(num);
            }
        }

        if (numberWindow.size() > 10) {
            numberWindow.subList(0, numberWindow.size() - 10).clear();
        }

        List<Integer> currState = new ArrayList<>(numberWindow);

        double sum = 0;
        for (int num : currState) {
            sum += num;
        }
        double avg = currState.isEmpty() ? 0.0 : sum / currState.size();

        return new WindowResponse(prevState, currState, newNumbers, avg);
    }
}
