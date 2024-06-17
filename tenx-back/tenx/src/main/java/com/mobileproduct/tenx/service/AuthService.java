package com.mobileproduct.tenx.service;

import com.mobileproduct.tenx.config.AuthConfig;
import com.mobileproduct.tenx.dto.BaseResponseDto;
import com.mobileproduct.tenx.dto.LoginRequest;
import com.mobileproduct.tenx.dto.LoginResponse;
import com.mobileproduct.tenx.dto.SignupRequest;
import com.mobileproduct.tenx.entity.Users;
import com.mobileproduct.tenx.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AuthService {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private AuthConfig authConfig;

    public BaseResponseDto signup(SignupRequest request) {
        BaseResponseDto responseDto = new BaseResponseDto();
        String message = null;
        String status = "Failed";
        String statusCode = "404";

        if(request.getEmail().isEmpty() || request.getPassword().isEmpty() || request.getRole() == null){
            message = "Mandatory Field can't be empty";
        }
        else{
            try {
                Users user = usersRepository.findByEmail(request.getEmail());
                if(user == null) {
                    Users users = new Users();
                    users.setEmail(request.getEmail());
                    users.setRole(request.getRole().toString());
                    users.setPassword(request.getPassword());

                    usersRepository.save(users);

                    message = "User saved successfully";
                    statusCode = "200";
                    status = "Success";
                    responseDto.setData(users.getUserId());
                }
                else{
                    message = "User Already exists with this mail id";
                    statusCode = "404";
                    status = "Failed";
                    responseDto.setData(new ArrayList<>());
                }
            }catch (Exception e){
                responseDto = new BaseResponseDto(e);
            }
        }
        responseDto.setResponseStatus(status);
        responseDto.setMessage(message);
        responseDto.setStatusCode(statusCode);

        return responseDto;
    }

    public BaseResponseDto login(LoginRequest request) {
        BaseResponseDto responseDto = new BaseResponseDto();
        String message = null;
        String status = "Failed";
        String statusCode = "404";
        Object data = new ArrayList<>();

        if(request.getEmail().isEmpty() || request.getPassword().isEmpty()){
            message = "Mandatory Field can't be empty";
        }
        else{
            try{
                Users users = usersRepository.findByEmail(request.getEmail());
                if(users == null) message = "users doesn't exists";

                else{
                   if(!users.getPassword().equalsIgnoreCase(request.getPassword())){
                       message = "Password not matched";
                       statusCode = "200";
                   }
                   else{
                       String token = authConfig.generateToken(users.getEmail(), users.getRole());

                       LoginResponse response = new LoginResponse();
                       response.setId(users.getUserId());
                       response.setRole(users.getRole());
                       response.setToken(token);

                       message = "Logged in successfully";
                       data = response;
                       statusCode = "200";
                       status = "Success";
                   }
                }
            }catch (Exception e){
                responseDto = new BaseResponseDto(e);
            }
        }
        responseDto.setResponseStatus(status);
        responseDto.setMessage(message);
        responseDto.setStatusCode(statusCode);
        responseDto.setData(data);

        return responseDto;
    }
}
