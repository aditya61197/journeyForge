package com.journeyforge.userservice.users;


//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class UserController {
    private UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
//    private static final Logger logger= LoggerFactory.getLogger(UserController.class);
    @GetMapping("/users")
    public ResponseEntity<List<User>>getAllUsers() {
        return new ResponseEntity<List<User>>((List<User>)userService.getAllUsers(),HttpStatus.OK);

    }

    @PostMapping("/users")
    public ResponseEntity<User> saveUser(@RequestBody User user){
        User savedUser=userService.saveUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);

    }



    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id,@RequestBody User user) throws Exception {
        user.setUser_id(id);
        return ResponseEntity.ok().body(this.userService.updateUser(user));
    }
    @DeleteMapping("/users/{id}")
    public HttpStatus deleteUser(@PathVariable String id) throws Exception {
        this.userService.deleteUser(id);
        return HttpStatus.OK;
    }


    @GetMapping("/userById/{user_id}")
    public ResponseEntity<?> userById(@PathVariable String user_id) {

        User user=userService.findById(user_id);

        if(user!=null)
            return new ResponseEntity<User>(user,HttpStatus.OK);

        return new ResponseEntity<String>("NotFound",HttpStatus.CONFLICT);
    }

    @GetMapping("/userByEmailId/{emailid}")
    public ResponseEntity<?> userByEmailid(@PathVariable String emailid) {

        User user=userService.findByEmailid(emailid);

        if(user!=null)
            return new ResponseEntity<User>(user,HttpStatus.OK);

        return new ResponseEntity<String>("NotFound",HttpStatus.CONFLICT);
    }



}