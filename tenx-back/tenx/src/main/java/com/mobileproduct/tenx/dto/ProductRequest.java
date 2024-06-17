package com.mobileproduct.tenx.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private Integer productId;
    private String productDesc;
    private String productName;
    private Integer adminId;
    private String token;
}
