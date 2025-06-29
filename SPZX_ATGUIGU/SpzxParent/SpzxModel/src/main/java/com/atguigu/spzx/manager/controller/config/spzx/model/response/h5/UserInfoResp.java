package com.atguigu.spzx.manager.controller.config.spzx.model.response.h5;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "用户类")
public class UserInfoResp {

   @Schema(description = "昵称")
   private String nickName;

   @Schema(description = "头像")
   private String avatar;

}