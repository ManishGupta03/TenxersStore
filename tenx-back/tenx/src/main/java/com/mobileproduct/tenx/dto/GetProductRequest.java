package com.mobileproduct.tenx.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetProductRequest {
    private Integer pageSize;
    private Integer pageNo;
    private Integer id;
}
