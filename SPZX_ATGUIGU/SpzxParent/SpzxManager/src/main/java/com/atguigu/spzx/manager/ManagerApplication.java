package com.atguigu.spzx.manager;

import com.atguigu.spzx.manager.properties.UserAuthProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
// SpringBoot默认扫描启动类所在包，及其子包中的配置类，使用@ComponentScan可以修改。
@ComponentScan(basePackages = "com.atguigu.spzx")
@EnableConfigurationProperties(value = {UserAuthProperties.class})
public class ManagerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ManagerApplication.class, args);
    }
}
