package com.journeyforge.userservice.jwtGenerator;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class JwtSecurityGenerator implements SecurityTokenGenerator {



	@Override
	public String generateToken(String email,String name,String pic) {
		Claims claims = Jwts.claims();
		claims.put("username", email); // username
		claims.put("name", name); // given name or name of user
		String jwtToken=Jwts.builder().setIssuer("JourneyForge")
				.setSubject(email).setIssuedAt(new Date()).setClaims(claims)
				.signWith(SignatureAlgorithm.HS256, "secret").compact();

		return jwtToken;
	}


}
