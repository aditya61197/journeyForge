package com.stackroute.journeyservice.utils;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

@Component
public class TokenParser {

    public Claims readToken(String token, String signInKey)
    {
        try
        {
            Claims claims = Jwts.parser()
                    .setSigningKey(signInKey)
                    .parseClaimsJws(token).getBody();

            return claims;
        }
        catch (ExpiredJwtException | MalformedJwtException | SignatureException | UnsupportedJwtException | IllegalArgumentException exc)
        {
            throw exc;
        }

    }
}
