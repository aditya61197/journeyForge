package com.journeyforge.client_webapp_service.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ClientWebAppController {

    @RequestMapping("/")
    public String getIndex() {
        return "index.html";
    }
}
