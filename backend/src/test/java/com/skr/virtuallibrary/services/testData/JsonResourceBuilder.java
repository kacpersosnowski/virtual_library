package com.skr.virtuallibrary.services.testData;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public final class JsonResourceBuilder {

    public <T> List<T> loadModelList(String resourcePath, Class<T> valueType) {
        ObjectMapper objectMapper = new ObjectMapper();
        try (InputStream json = new ClassPathResource(resourcePath).getInputStream()) {
            JavaType type = objectMapper.getTypeFactory().constructCollectionType(List.class, valueType);
            return objectMapper.readValue(json, type);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

}
