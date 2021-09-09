package com.stackroute.recommendationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class RecommendationserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecommendationserviceApplication.class, args);
	}

}
