package com.skr.virtuallibrary.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "yzObdPkgILxfV1B2ZF0ukLvS3qDODsuILfvpOam6aElLKZP4wHzC7qtCn4Sjm5c2MR1NUxYiLjgCDezhFJ6rt9qiCXcdO6jZoXWRqeOPxPAGsW1cYfgNm3MMm3gCmp9LwoO6qJ09vnAvinbrgGUvL0UHoNuzsOh5sc4qB6AH0erY5ZRjXQBG2nT90n1opZaxGl0qR3MKRehTAoW0HEs2Jbs32FcIenNBFIzpyjwnHJs6eH/Aq9uJ+yZqhyX8JjYVP9tJ37hf5X8gh+cQOKbNf3CBVaaA2bTk4Cygs8jpQ/6hT4Q5nSvE/sNp84ieAAkYLSS2akg5uEfH1q3nc6zLvAKEXrUe2Oyw8PksxsZdgAo=";

    public String extractEmail(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }

    public <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }

    public AuthenticationResponse generateTokens(UserDetails userDetails) {
        final String accessToken = generateToken(userDetails, new Date(System.currentTimeMillis() + 1000 * 60 * 15));
        final String refreshToken = generateToken(userDetails, new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 30));
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    private String generateToken(UserDetails userDetails, Date expiration) {
        return Jwts
                .builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expiration)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
        final String email = extractEmail(jwtToken);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken);
    }

    private boolean isTokenExpired(String jwtToken) {
        return extractExpiration(jwtToken).before(new Date());
    }

    private Date extractExpiration(String jwtToken) {
        return extractClaim(jwtToken, Claims::getExpiration);
    }

    private Claims extractAllClaims(String jwtToken) {
        try {
            return Jwts
                    .parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(jwtToken)
                    .getBody();
        } catch (ExpiredJwtException ex) {
            return ex.getClaims();
        }

    }

    private Key getSignInKey() {
        byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(decodedKey);
    }

}
