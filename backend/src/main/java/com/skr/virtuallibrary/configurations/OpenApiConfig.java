package com.skr.virtuallibrary.configurations;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement()
                        .addList("Bearer Authentication"))
                    .components(new Components().addSecuritySchemes
                            ("Bearer Authentication", securityScheme()))
                .info(new Info()
                        .title("Virtual Library Backend REST API")
                        .description("REST API for Virtual Library")
                        .version("1.0")
                        .contact(new Contact()
                                .name("KRS")
                                .email("www.example.com")
                                .url("name.surname@example.com"))
                        .license(new License()
                                .name("License of API")
                                .url("API license URL")));
    }

    private SecurityScheme securityScheme() {
        return new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT");
    }

}
