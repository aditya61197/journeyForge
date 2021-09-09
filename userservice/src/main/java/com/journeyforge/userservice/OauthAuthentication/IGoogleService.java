package com.journeyforge.userservice.OauthAuthentication;

import com.journeyforge.userservice.users.User;
import org.json.simple.parser.ParseException;

public interface IGoogleService {
    String googlelogin();

    String getGoogleAccessToken(String code);

    User getGoogleUserProfile(String accessToken) throws ParseException;
}
