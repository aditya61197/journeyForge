package com.journeyforge.userservice.users;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Date;

@Document
public class User {
    //user same model class
    @Id
    private String user_id;
    private String username;
    private String name;
    private String userrole;
    private String emailid;
    private Long phoneNo;
    private String password;
    private String address;
    private Date dob;
    private String gender;
    private String[] qualifications;
    private String[] interests;
    private Date lastLogin;
    private String updatedBy;
    private Date updatedOn;
    private String createdBy;
    private Date createdOn;
    private String picture;
    @Enumerated(EnumType.STRING)
    private UserLoginType loginType;

    public String getName() {
        return name;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserLoginType getLoginType() {
        return loginType;
    }

    public void setLoginType(UserLoginType loginType) {
        this.loginType = loginType;
    }

    public User(){

    }

    public User(String user_id, String username, String name, String userrole, String emailid, Long phoneNo, String password, String address, Date dob, String gender, String[] qualifications, String[] interests, Date lastLogin, String updatedBy, Date updatedOn, String createdBy, Date createdOn, String picture, UserLoginType loginType) {
        this.user_id = user_id;
        this.username = username;
        this.name = name;
        this.userrole = userrole;
        this.emailid = emailid;
        this.phoneNo = phoneNo;
        this.password = password;
        this.address = address;
        this.dob = dob;
        this.gender = gender;
        this.qualifications = qualifications;
        this.interests = interests;
        this.lastLogin = lastLogin;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.picture = picture;
        this.loginType = loginType;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserrole() {
        return userrole;
    }

    public void setUserrole(String userrole) {
        this.userrole = userrole;
    }

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }

    public Long getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(Long phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String[] getQualifications() {
        return qualifications;
    }

    public void setQualifications(String[] qualifications) {
        this.qualifications = qualifications;
    }

    public String[] getInterests() {
        return interests;
    }

    public void setInterests(String[] interests) {
        this.interests = interests;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Date getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(Date updatedOn) {
        this.updatedOn = updatedOn;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }


}