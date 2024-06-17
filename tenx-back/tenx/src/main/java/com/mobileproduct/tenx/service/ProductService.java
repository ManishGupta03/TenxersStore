package com.mobileproduct.tenx.service;

import com.mobileproduct.tenx.config.AuthConfig;
import com.mobileproduct.tenx.dto.GetProductRequest;
import com.mobileproduct.tenx.dto.ProductRequest;
import com.mobileproduct.tenx.dto.BaseResponseDto;
import com.mobileproduct.tenx.dto.ProductResponse;
import com.mobileproduct.tenx.entity.Products;
import com.mobileproduct.tenx.entity.Users;
import com.mobileproduct.tenx.enums.Roles;
import com.mobileproduct.tenx.repository.ProductRepository;
import com.mobileproduct.tenx.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private AuthConfig authConfig;

    public BaseResponseDto createProduct(ProductRequest request) {
        BaseResponseDto responseDto = new BaseResponseDto();
        String message = null;
        String status = "Failed";
        String statusCode = "404";
        try{
            Users users = usersRepository.findById(request.getAdminId()).orElse(null);
            if(users == null) message = "User not found";
            else{
                if(!users.getRole().equalsIgnoreCase(String.valueOf(Roles.Admin))) {
                    message = "User not authorized to add the product";
                    statusCode = "200";
                }
                else{
                    Products products = new Products();
                    products.setProductName(request.getProductName());
                    products.setProductDesc(request.getProductDesc());
                    products.setCreatedBy(users);
                    products.setCreatedAt(LocalDateTime.now());

                    productRepository.save(products);

                    message = "Product save successfully";
                    statusCode = "200";
                    status = "Success";
                }
            }
        }catch (Exception e){
            responseDto = new BaseResponseDto(e);
        }
        responseDto.setMessage(message);
        responseDto.setStatusCode(statusCode);
        responseDto.setResponseStatus(status);

        return responseDto;
    }

    public BaseResponseDto updateProduct(ProductRequest request) {
        BaseResponseDto responseDto = new BaseResponseDto();
        String message = null;
        String status = "Failed";
        String statusCode = "404";
        try{
            Users users = usersRepository.findById(request.getAdminId()).orElse(null);
            if(users == null) message = "User not found";
            else{
                if(!users.getRole().equalsIgnoreCase(String.valueOf(Roles.Admin))) {
                    message = "User not authorized to add the product";
                    statusCode = "200";
                }
                else{
                    Products products = productRepository.findById(request.getProductId()).orElse(null);
                    if(products != null) {
                        products.setProductName(request.getProductName());
                        products.setProductDesc(request.getProductDesc());
                        products.setCreatedBy(users);

                        productRepository.save(products);

                        message = "Product update successfully";
                        statusCode = "200";
                        status = "Success";
                    }
                    else{
                        message = "Product id not found";
                        statusCode = "200";
                    }
                }
            }
        }catch (Exception e){
            responseDto = new BaseResponseDto(e);
        }
        responseDto.setMessage(message);
        responseDto.setStatusCode(statusCode);
        responseDto.setResponseStatus(status);

        return responseDto;
    }

    public BaseResponseDto deleteProduct(ProductRequest request) {
        BaseResponseDto responseDto = new BaseResponseDto();
        String message = null;
        String status = "Failed";
        String statusCode = "404";
        try{
            //we can use role for verification
            String role = authConfig.extractClaim(request.getToken());

            Users users = usersRepository.findById(request.getAdminId()).orElse(null);
            if(users == null) message = "User not found";
            else{
                if(!users.getRole().equalsIgnoreCase(String.valueOf(Roles.Admin))) {
                    message = "User not authorized to add the product";
                    statusCode = "200";
                }
                else{
                    Products products = productRepository.findById(request.getProductId()).orElse(null);
                    if(products != null) productRepository.delete(products);

                    message = "Product delete successfully";
                    statusCode = "200";
                    status = "Success";
                }
            }
        }catch (Exception e){
            responseDto = new BaseResponseDto(e);
        }
        responseDto.setMessage(message);
        responseDto.setStatusCode(statusCode);
        responseDto.setResponseStatus(status);

        return responseDto;
    }

    public BaseResponseDto getProduct() {
        BaseResponseDto responseDto = new BaseResponseDto();
        String message = null;
        String status = "Failed";
        String statusCode = "404";
        Object data = new ArrayList<>();

        try{
            List<Products> productList = productRepository.findAll();
            if (productList.isEmpty()) {
                message = "No products were added";
                statusCode = "200";
                status = "Success";
            } else {
                List<ProductResponse> responses = new ArrayList<>();
                for(Products item : productList) {
                    ProductResponse response = new ProductResponse();
                    response.setProductName(item.getProductName());
                    response.setProductDesc(item.getProductDesc());
                    response.setCreatedBy(item.getCreatedBy().getEmail());
                    response.setCreatedAt(item.getCreatedAt());
                    response.setProductId(item.getProductId());
                    responses.add(response);
                }
                data = responses;
                message = "Product found successfully";
                statusCode = "200";
                status = "Success";
            }

        }catch (Exception e){
            responseDto = new BaseResponseDto(e);
        }
        responseDto.setMessage(message);
        responseDto.setStatusCode(statusCode);
        responseDto.setResponseStatus(status);
        responseDto.setData(data);

        return responseDto;
    }
}
