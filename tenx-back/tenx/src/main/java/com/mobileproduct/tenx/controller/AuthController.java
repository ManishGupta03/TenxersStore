package com.mobileproduct.tenx.controller;

import com.mobileproduct.tenx.dto.BaseResponseDto;
import com.mobileproduct.tenx.dto.LoginRequest;
import com.mobileproduct.tenx.dto.SignupRequest;
import com.mobileproduct.tenx.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(allowedHeaders = "*")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public BaseResponseDto signup(@RequestBody SignupRequest request) {
        BaseResponseDto responseDto;
        try {
            responseDto = authService.signup(request);
        } catch (Exception e) {
            e.printStackTrace();
            responseDto = new BaseResponseDto(e);
        }
        return responseDto;
    }
    @PostMapping("/login")
    public BaseResponseDto login(@RequestBody LoginRequest request) {
        BaseResponseDto responseDto;
        try {
            responseDto = authService.login(request);
        } catch (Exception e) {
            e.printStackTrace();
            responseDto = new BaseResponseDto(e);
        }
        return responseDto;
    }
}
