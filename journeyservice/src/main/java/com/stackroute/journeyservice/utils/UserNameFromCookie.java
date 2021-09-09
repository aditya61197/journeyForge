package com.stackroute.journeyservice.utils;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Component
public class UserNameFromCookie {

    @Autowired
    TokenParser tokenParser;

    @Value("${cookiename}")
    private String cookieName;

    @Value("${signinkey}")
    private String signInKey;

    public String getUserNameFromCookie(HttpServletRequest httpServletRequest)
    {
        Cookie[] cookies = httpServletRequest.getCookies();
        String jwtToken = "";

        for(Cookie cookie : cookies)
        {
            if(cookieName.equals(cookie.getName()))
            {
                jwtToken = cookie.getValue();
            }
        }

        Claims claims = tokenParser.readToken(jwtToken, signInKey);
        String username = (String) claims.get("username");
        return username;
    }
}
