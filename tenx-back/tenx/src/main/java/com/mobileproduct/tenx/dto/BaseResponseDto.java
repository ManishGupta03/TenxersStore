package com.mobileproduct.tenx.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class BaseResponseDto {
   private String statusCode ;
   private String responseStatus;
   private String message;
   private Object data;

   public BaseResponseDto (String status, String statusCode, String message) {
      this.statusCode = statusCode;
      this.message = message;
      this.responseStatus = status;
   }
   public BaseResponseDto (Exception e) {
      this.statusCode = "500";
      this.responseStatus = "Failed";
      this.data = new ArrayList<>();
      this.message = e.getMessage();
   }

}
