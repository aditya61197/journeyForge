package com.stackroute.journeyservice.Domain;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DomainRepository extends MongoRepository<Domain, String> {
     List<Domain> findByDomainCreatedBy(String username);

}
