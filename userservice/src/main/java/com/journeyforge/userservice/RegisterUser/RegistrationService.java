package com.journeyforge.userservice.RegisterUser;



import com.journeyforge.userservice.users.User;
import com.journeyforge.userservice.users.UserLoginType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.UUID;

@Service
public class RegistrationService {
//    private PassWordEncryptAndDecrypt passWordEncryptAndDecrypt;

    private RegistrationRepository registrationRepository;
    @Autowired
    public RegistrationService(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;

    }

    public User saveUser(User user) throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
//       Key key= passWordEncryptAndDecrypt.inputFile();
        User user1=new User();
        user1.setUser_id(UUID.randomUUID().toString());
        user1.setUsername(user.getEmailid());
        user1.setName(user.getName());
        user1.setUserrole("");
        user1.setEmailid(user.getEmailid());
        user1.setPassword(BCrypt.hashpw(user.getPassword(),BCrypt.gensalt(10)));
        user1.setPhoneNo(null);
        user1.setAddress("");
        user1.setDob(null);
        user1.setGender("");
        user1.setQualifications(new String[0]);
        user1.setInterests(new String[0]);
        user1.setLastLogin(new Date());
        user1.setUpdatedBy(user.getName());
        user1.setUpdatedOn(new Date());
        user1.setCreatedBy(user.getName());
        user1.setCreatedOn(new Date());
        user1.setPicture(null);
        user1.setLoginType(UserLoginType.MANUAL_REGISTRATION);
       return registrationRepository.save(user1);
    }
    public User fetchUserByEmailId(String emailid){
        return registrationRepository.findByEmailid(emailid);
    }
    public User fetchUserByEmailIdAndPassword(String emailId, String password) throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
//        Key key= passWordEncryptAndDecrypt.inputFile();
//        String pass=passWordEncryptAndDecrypt.encryptUsingAESKey(password,key.getEncoded());
//        String pass= BCrypt.hashpw(password,BCrypt.gensalt(10));
          User user = registrationRepository.findByEmailid(emailId);
          if(user==null){
            return null;
          }else{
        String encryptedPass = user.getPassword();
        Boolean decryptPass = BCrypt.checkpw(password,encryptedPass);
       if(decryptPass==true){
           return user;
       }else{
           return null;
       }
          }
    }
}
