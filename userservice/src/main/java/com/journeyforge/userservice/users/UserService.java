package com.journeyforge.userservice.users;


import java.util.List;

public interface UserService {
    User saveUser(User user);
    List<User> getAllUsers();

    void deleteUser(String id) throws Exception;
    User updateUser(User user) throws Exception;
    User userByEmailId(String emailId);

    User findById(String user_id);
    User findByEmailid(String emailid);

}