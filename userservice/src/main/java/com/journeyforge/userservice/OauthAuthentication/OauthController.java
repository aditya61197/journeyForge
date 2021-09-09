package com.journeyforge.userservice.OauthAuthentication;

import com.journeyforge.userservice.users.User;
import com.journeyforge.userservice.users.UserRepository;
import com.journeyforge.userservice.users.UserService;
import com.journeyforge.userservice.util.CookieUtil;
import com.journeyforge.userservice.util.JwtUtil;

import org.json.simple.parser.ParseException;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletResponse;
import java.io.ObjectInputFilter;
import java.time.LocalDateTime;
import java.util.Date;

@Controller
@RequestMapping("api/v1/authorize")
public class OauthController {
    private static final org.slf4j.Logger Logger = LoggerFactory.getLogger(ObjectInputFilter.Config.class);
    @Autowired
    IGoogleService googleService;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;
    private static final String jwtTokenCookieName = "JWT-TOKEN";

    @Value("${Domain}")
    String domain;

    @Value("${redirect_url_studio_home}")
    String redirect_url_studio_home;

    @Value("${redirect_url_client_home}")
    String redirect_url_client_home;


    @GetMapping(value = "/studio/googlelogin")
    public RedirectView studioGooglelogin() {
        RedirectView redirectview = new RedirectView();
        String url = googleService.googlelogin();
        String urlUpdated = url + "&state=studio";

        redirectview.setUrl(urlUpdated);
        return redirectview;
    }

    @GetMapping(value = "/client/googlelogin")
    public RedirectView clientGooglelogin() {
        RedirectView redirectview = new RedirectView();
        String url = googleService.googlelogin();
        String urlUpdated = url + "&state=client";

        redirectview.setUrl(urlUpdated);
        return redirectview;
    }

    // Google calls back on user's successful authentication and consent
    @GetMapping(value = "/complete")
    public RedirectView google(@RequestParam("code") String code, @RequestParam("state") String state, HttpServletResponse res) throws ParseException {
        String accessToken = googleService.getGoogleAccessToken(code);
        User userreq = googleService.getGoogleUserProfile(accessToken);
        String jwtToken = JwtUtil.addToken(res, userreq);
        CookieUtil.create(res, jwtTokenCookieName, jwtToken, false, -1, domain);
        RedirectView redirectview = new RedirectView();
        try {
            User userObj = userService.userByEmailId(userreq.getEmailid());
            if (userObj == null) {
                Logger.info("User is not there, creating new user" + userreq.toString());
                userService.saveUser(userreq);

            } else {
                userObj.setLastLogin(new Date());
                Logger.info("User is already there");

                userService.updateUser(userObj);
            }
        } catch (Exception exception) {
            System.out.println("In google method " + LocalDateTime.now() + " " + exception.getMessage());
        }
        if (state.equals("studio")) {
            redirectview.setUrl(redirect_url_studio_home);
        } else if (state.equals("client")) {
            redirectview.setUrl(redirect_url_client_home);
        }

        return redirectview;
    }
}
