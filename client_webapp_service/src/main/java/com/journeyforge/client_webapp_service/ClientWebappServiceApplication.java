package com.journeyforge.client_webapp_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ClientWebappServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClientWebappServiceApplication.class, args);
	}

}
