URI uri = new URI(baseUri + "?accountNumber=" + accountNumber
        + "&documentType=" + documentType
        + "&envelopeId=" + envelopeId);
















#test ifa
package com.example.demo.model;

import lombok.Data;

import javax.validation.constraints.Pattern;

@Data
public class DataModel {
    @Pattern(regexp = "\\d+", message = "Field1 must be a numeric value")
    private String field1;

    @Pattern(regexp = "\\d+", message = "Field2 must be a numeric value")
    private String field2;

    // Constant fields field3 and field4
}

////////////////////////////////////////////////
package com.example.demo.controller;

import com.example.demo.model.DataModel;
import com.example.demo.service.DataProcessingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class ApiController {

    private final DataProcessingService dataProcessingService;

    @PutMapping("/process-data")
    public ResponseEntity<String> processData(@Valid @RequestBody DataModel data, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            log.error("Validation error: {}", bindingResult.getFieldError().getDefaultMessage());
            return ResponseEntity.badRequest().body("Validation error: " + bindingResult.getFieldError().getDefaultMessage());
        }

        return dataProcessingService.processData(data);
    }
}
