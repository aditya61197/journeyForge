package com.journeyforge.userservice.jwtGenerator;

public interface SecurityTokenGenerator {
String generateToken(String email,String name,String picture);

}
