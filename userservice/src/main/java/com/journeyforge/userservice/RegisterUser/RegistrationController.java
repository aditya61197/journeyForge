package com.journeyforge.userservice.RegisterUser;


import com.journeyforge.userservice.jwtGenerator.JwtSecurityGenerator;
import com.journeyforge.userservice.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/api/v1")
public class RegistrationController {
  //  private static final String jwtTokenCookieName = "JWT-TOKEN";
    private JwtSecurityGenerator jwtSecurityGenerator;
    private RegistrationService registrationService;
    private String jwtToken=null;

    @Value("${Domain}")
    String domain;
    @Value("${redirect_url_studio_home}")
    String urlStudio;
    @Value("${redirect_url_client_home}")
    String urlClient;

    @Autowired
    public RegistrationController(RegistrationService registrationService,JwtSecurityGenerator jwtSecurityGenerator) {
        this.registrationService = registrationService;
        this.jwtSecurityGenerator = jwtSecurityGenerator;
    }
    @PostMapping("/studio/user/register")
    public ResponseEntity<Boolean> registerStudioUser(@RequestBody User user) throws Exception {
        String tempEmail = user.getEmailid();
        if(tempEmail!=null && !"".equals(tempEmail)){
          User userObj = registrationService.fetchUserByEmailId(tempEmail);
          if(userObj != null){
              throw new Exception("User With "+tempEmail+" Already exists");
          }
        }

        registrationService.saveUser(user);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
    @PostMapping("/studio/user/login")
    public ResponseEntity<String> loginStudioUser(@RequestBody User user, HttpServletResponse response) throws Exception {
       String tempEmailId = user.getEmailid();
       String tempPassword = user.getPassword();
        User tempUser=null;
       if(tempEmailId!=null && tempPassword!=null){
           tempUser = registrationService
                   .fetchUserByEmailIdAndPassword(tempEmailId,tempPassword);
       }
       if(tempUser == null){
           throw new Exception("Bad Credentials -> User with EmailId "+tempEmailId+" doesn't exists or Entered a Incorrect Password");
       }
        String email=user.getEmailid();
       User user1=registrationService.fetchUserByEmailId(email);
        String name=user1.getName();
        String pic = user1.getPicture();
        jwtToken = jwtSecurityGenerator.generateToken(email,name,pic);
//        CookieUtil.create(response, jwtTokenCookieName, jwtToken, false, -1, domain);
//        RedirectView redirectView=new RedirectView();
//        redirectView.setContextRelative(true);
//        redirectView.setUrl(urlStudio);
        return new ResponseEntity<>(jwtToken,HttpStatus.OK);

    }
    @PostMapping("/client/user/register")
    public ResponseEntity<Boolean> registerClientUser(@RequestBody User user) throws Exception {
        String tempEmail = user.getEmailid();
        if(tempEmail!=null && !"".equals(tempEmail)){
            User userObj = registrationService.fetchUserByEmailId(tempEmail);
            if(userObj != null){
                throw new Exception("User With "+tempEmail+" Already exists");
            }
        }

        registrationService.saveUser(user);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
    @PostMapping("/client/user/login")
    public ResponseEntity<String> loginClientUser(@RequestBody User user) throws Exception {
        String tempEmailId = user.getEmailid();
        String tempPassword = user.getPassword();
        User tempUser=null;
        if(tempEmailId!=null && tempPassword!=null){
            tempUser = registrationService
                    .fetchUserByEmailIdAndPassword(tempEmailId,tempPassword);
        }
        if(tempUser == null){
            throw new Exception("Bad Credentials -> User with EmailId "+tempEmailId+" doesn't exists or Entered a Incorrect Password");
        }
        String email=user.getEmailid();
        User user1=registrationService.fetchUserByEmailId(email);
        String name=user1.getName();
        String pic = user1.getPicture();
        jwtToken = jwtSecurityGenerator.generateToken(email,name,pic);
//        CookieUtil.create(response, jwtTokenCookieName, jwtToken, false, -1, domain);
//        RedirectView redirectView=new RedirectView();
//        redirectView.setContextRelative(true);
//        redirectView.setUrl(urlClient);
        return new ResponseEntity<>(jwtToken,HttpStatus.OK);

        //response Entity

    }

}
