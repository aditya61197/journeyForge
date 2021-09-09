package com.stackroute.journeyservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;

@EnableNeo4jRepositories
@SpringBootApplication
@EnableEurekaClient
public class JourneyserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(JourneyserviceApplication.class, args);
	}

}
