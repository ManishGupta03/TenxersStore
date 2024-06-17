package com.mobileproduct.tenx.controller;

import com.mobileproduct.tenx.dto.GetProductRequest;
import com.mobileproduct.tenx.dto.ProductRequest;
import com.mobileproduct.tenx.dto.BaseResponseDto;
import com.mobileproduct.tenx.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@CrossOrigin(allowedHeaders = "*")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/create")
    public BaseResponseDto createProduct(@RequestBody ProductRequest request) {
        BaseResponseDto responseDto;
        try {
            responseDto = productService.createProduct(request);
        } catch (Exception e) {
            e.printStackTrace();
            responseDto = new BaseResponseDto(e);
        }
        return responseDto;
    }
    @PostMapping("/update")
    public BaseResponseDto updateProduct(@RequestBody ProductRequest request) {
        BaseResponseDto responseDto;
        try {
            responseDto = productService.updateProduct(request);
        } catch (Exception e) {
            e.printStackTrace();
            responseDto = new BaseResponseDto(e);
        }
        return responseDto;
    }
    @PostMapping("/delete")
    public BaseResponseDto deleteProduct(@RequestBody ProductRequest request) {
        BaseResponseDto responseDto;
        try {
            responseDto = productService.deleteProduct(request);
        } catch (Exception e) {
            e.printStackTrace();
            responseDto = new BaseResponseDto(e);
        }
        return responseDto;
    }
    @GetMapping("/get")
    public BaseResponseDto getProduct() {
        BaseResponseDto responseDto;
        try {
            responseDto = productService.getProduct();
        } catch (Exception e) {
            e.printStackTrace();
            responseDto = new BaseResponseDto(e);
        }
        return responseDto;
    }

}
