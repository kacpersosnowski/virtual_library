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

    private static final String REVIEW_ENDPOINT = "/reviews/**";

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           CorsConfigurationSource corsConfigurationSource) throws Exception {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("/email/**").hasAuthority(ADMIN_AUTHORITY)
                                .requestMatchers(HttpMethod.POST, "/auth/quick-register").hasAuthority(ADMIN_AUTHORITY)

                                .requestMatchers(HttpMethod.GET, "/users/me").authenticated()
                                .requestMatchers(HttpMethod.PATCH, "/users/**").authenticated()
                                .requestMatchers(HttpMethod.PUT, "/users").authenticated()
                                .requestMatchers(HttpMethod.POST, "/users/reset-password").permitAll()
                                .requestMatchers(HttpMethod.POST, "/users/finalize-password-reset").permitAll()

                                .requestMatchers(HttpMethod.POST, REVIEW_ENDPOINT).authenticated()
                                .requestMatchers(HttpMethod.PUT, REVIEW_ENDPOINT).authenticated()
                                .requestMatchers(HttpMethod.DELETE, REVIEW_ENDPOINT).authenticated()

                                .requestMatchers(HttpMethod.GET, REVIEW_ENDPOINT).permitAll()
                                .requestMatchers(HttpMethod.GET, "/books/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/authors/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/genres/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/files/image/**").permitAll()
                                .requestMatchers("/auth/**").permitAll()

                                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                                .requestMatchers("/error").anonymous()

                                .anyRequest().hasAuthority(ADMIN_AUTHORITY)
                )
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
