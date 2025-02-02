package com.techeerlog.auth.domain.encryptor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EncryptorFactory {

    @Bean
    public EncryptorI getOldEncryptor(@Value("${common.salt.old}") String salt) {
        return new Encryptor(salt);
    }

    @Bean
    public EncryptorI getNewEncryptor(@Value("${common.salt.new}") String salt) {
        return new Encryptor(salt);
    }
}
