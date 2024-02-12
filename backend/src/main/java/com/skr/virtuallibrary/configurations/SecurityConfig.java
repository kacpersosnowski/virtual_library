package com.skr.virtuallibrary.configurations;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    private final AuthenticationProvider authenticationProvider;

    private static final String ADMIN_AUTHORITY = "ADMIN";

    private static final String BOOK_ENDPOINT = "/books/**";

    private static final String AUTHOR_ENDPOINT = "/authors/**";

    private static final String GENRE_ENDPOINT = "/genres/**";

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           CorsConfigurationSource corsConfigurationSource) throws Exception {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers(HttpMethod.POST, "/auth/quick-register").hasAuthority(ADMIN_AUTHORITY)

                                .requestMatchers(HttpMethod.POST, BOOK_ENDPOINT).hasAuthority(ADMIN_AUTHORITY)
                                .requestMatchers(HttpMethod.PUT, BOOK_ENDPOINT).hasAuthority(ADMIN_AUTHORITY)
                                .requestMatchers(HttpMethod.DELETE, BOOK_ENDPOINT).hasAuthority(ADMIN_AUTHORITY)

                                .requestMatchers(HttpMethod.POST, AUTHOR_ENDPOINT).hasAuthority(ADMIN_AUTHORITY)
                                .requestMatchers(HttpMethod.PUT, AUTHOR_ENDPOINT).hasAuthority(ADMIN_AUTHORITY)
                                .requestMatchers(HttpMethod.DELETE, AUTHOR_ENDPOINT).hasAuthority(ADMIN_AUTHORITY)

                                .requestMatchers(HttpMethod.POST, GENRE_ENDPOINT).hasAuthority(ADMIN_AUTHORITY)
                                .requestMatchers(HttpMethod.PUT, GENRE_ENDPOINT).hasAuthority(ADMIN_AUTHORITY)
                                .requestMatchers(HttpMethod.DELETE, GENRE_ENDPOINT).hasAuthority(ADMIN_AUTHORITY)

                                .requestMatchers(HttpMethod.GET, BOOK_ENDPOINT).permitAll()
                                .requestMatchers(HttpMethod.GET, "/files/cover/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/reviews/**").permitAll()
                                .requestMatchers("/auth/**").permitAll()
                                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                                .requestMatchers("/error").anonymous()
                                .anyRequest().authenticated()
                )
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
