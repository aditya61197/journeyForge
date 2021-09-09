package com.journeyforge.studio_webapp_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class StudioWebappServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudioWebappServiceApplication.class, args);
	}

}
