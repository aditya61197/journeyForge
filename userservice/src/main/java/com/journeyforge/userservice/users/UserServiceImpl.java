package com.journeyforge.userservice.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        user.setUser_id(UUID.randomUUID().toString());
        return userRepository.save(user);
    }


    @Override
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }



    @Override
    public User updateUser(User user) throws Exception {
        Optional<User> userDB =this.userRepository.findById(user.getUser_id());
        if(userDB.isPresent()) {
            User userUpdate = userDB.get();
            userUpdate.setUser_id(user.getUser_id());
            userUpdate.setUsername(user.getUsername());
            userUpdate.setUserrole(user.getUserrole());
            userUpdate.setEmailid(user.getEmailid());
            userUpdate.setPhoneNo(user.getPhoneNo());
            userUpdate.setAddress(user.getAddress());
            userUpdate.setDob(user.getDob());
            userUpdate.setGender(user.getGender());
            userUpdate.setQualifications(user.getQualifications());
            userUpdate.setInterests(user.getInterests());
            userUpdate.setUpdatedBy("Nakul");
            userUpdate.setUpdatedOn(new Date());
            userUpdate.setLoginType(UserLoginType.GOOGLE);
            userRepository.save(userUpdate);
            return userUpdate;
        }else{
            throw new Exception("Record not found with given id");
        }
    }

    @Override
    public User userByEmailId(String emailId) {
        return userRepository.findByEmailid(emailId);
    }


    @Override
    public User findById(String id) {
        User user=userRepository.findById(id).get();
        return user;
    }


    @Override
    public User findByEmailid(String emailid) {
        User user=userRepository.findByEmailid(emailid);
        return user;
    }

    @Override
    public void deleteUser(String id) throws Exception {
        Optional<User> userDB=this.userRepository.findById(id);
        if(userDB.isPresent()){
            this.userRepository.delete(userDB.get());
        }else{
            throw new Exception("user not found");
        }
    }




}