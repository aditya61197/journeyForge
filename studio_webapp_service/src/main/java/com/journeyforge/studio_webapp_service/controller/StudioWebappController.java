package com.journeyforge.studio_webapp_service.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StudioWebappController {

    @RequestMapping(value = "/")
    public String getIndex() {
        return "index.html";
    }
}
