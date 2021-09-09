package com.stackroute.journeyservice.Domain;

import com.stackroute.journeyservice.utils.TokenParser;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("api/v1")
public class DomainController {

    private DomainService domainService;

    @Autowired
    public DomainController(DomainService domainService) {
        this.domainService = domainService;
    }

    @Autowired
    TokenParser tokenParser;

    @Value("${cookiename}")
    private String cookieName;

    @Value("${signinkey}")
    private String signInKey;

    @PostMapping("/domains")
    public ResponseEntity<Domain> createDomain(@RequestBody Domain domain, HttpServletRequest httpServletRequest)
            throws Exception {
        Cookie[] cookies = httpServletRequest.getCookies();

        String jwtToken = "";

        for (Cookie cookie : cookies) {
            if (cookieName.equals(cookie.getName())) {
                jwtToken = cookie.getValue();
            }
        }

        Claims claims = tokenParser.readToken(jwtToken, signInKey);
        String username = (String) claims.get("username");

        Domain saveDomain = domainService.createDomain(domain, username);
        return new ResponseEntity<Domain>(saveDomain, HttpStatus.CREATED);
    }

    @GetMapping("/client/domains")
    public ResponseEntity<List<Domain>> getClientDomains() {
        return new ResponseEntity<List<Domain>>((List<Domain>) domainService.getClientDomains(), HttpStatus.OK);

    }

    @GetMapping("/domains")
    public ResponseEntity<List<Domain>> getAllDomains(HttpServletRequest httpServletRequest) {

        Cookie[] cookies = httpServletRequest.getCookies();

        String jwtToken = "";
//        System.out.println("cookies"+cookies);
        for (Cookie cookie : cookies) {
            if (cookieName.equals(cookie.getName())) {
                jwtToken = cookie.getValue();
            }
        }

       Claims claims = tokenParser.readToken(jwtToken, signInKey);
       String username = (String) claims.get("username");

        return new ResponseEntity<List<Domain>>((List<Domain>) domainService.getAllDomains(username), HttpStatus.OK);

    }

    @PutMapping("/domains/{domainId}")
    public ResponseEntity<Domain> updateDomainByDomainId(@PathVariable String domainId, @RequestBody Domain domain)
            throws Exception {
        domain.setDomainId(domainId);
        return ResponseEntity.ok().body(this.domainService.updateDomainByDomainId(domain));
    }

    @DeleteMapping("/domains/{domainId}")
    public HttpStatus deleteDomainByDomainId(@PathVariable String domainId) throws Exception {
        this.domainService.deleteDomainByDomainId(domainId);
        return HttpStatus.OK;
    }

    @GetMapping("/domains/{domainId}")
    public ResponseEntity<?> getDomainByDomainId(@PathVariable String domainId) {

        Domain domain = domainService.findById(domainId);

        if (domain != null)
            return new ResponseEntity<Domain>(domain, HttpStatus.OK);

        return new ResponseEntity<String>("NotFound", HttpStatus.CONFLICT);
    }

}
