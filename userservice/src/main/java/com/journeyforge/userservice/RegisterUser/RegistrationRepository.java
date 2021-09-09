package com.journeyforge.userservice.RegisterUser;


import com.journeyforge.userservice.users.User;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface RegistrationRepository extends MongoRepository<User, Integer> {
    User findByEmailid(String emailId);
    User findByEmailidAndPassword(String emailId, String password );
}
