package com.techeerlog.auth.domain.encryptor;


import com.techeerlog.global.exception.ExternalLibraryException;
import org.springframework.beans.factory.annotation.Value;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Encryptor implements EncryptorI {

    private final String salt;

    public Encryptor(String salt) {
        this.salt = salt;
    }

    @Override
    public String encrypt(String text) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update((text + salt).getBytes());
            // digest의 반환값은 byte 형태이므로, Hex 형태의 String 형태로 변환
            return bytesToHex(messageDigest.digest());
        } catch (NoSuchAlgorithmException e) {
            throw new ExternalLibraryException();
        }
    }

    private String bytesToHex(byte[] digest) {
        StringBuilder builder = new StringBuilder();
        for (byte b : digest)
            builder.append(String.format("%02x", b));
        return builder.toString();
    }
}
