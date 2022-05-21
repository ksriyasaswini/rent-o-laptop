package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.io.BaseEncoding;

import Doas.*;
import io.jsonwebtoken.impl.crypto.MacProvider;

import org.springframework.beans.factory.annotation.Autowired;
import play.Logger;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import java.lang.String;
import models.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


import play.mvc.*;
import javax.inject.Inject;
import javax.persistence.TypedQuery;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserController extends Controller {

    private final static Logger.ALogger LOGGER = Logger.of(UserController.class);
    private final static int HASH_ITERATIONS = 100;

    @Inject
    public UserController(JPAApi jpaApi, UserDao userDao) {
        this.jpaApi = jpaApi;
        this.userDao = userDao;
    }


    final JPAApi jpaApi;


    @Autowired
    final UserDao userDao;

    @Transactional
    public Result createUserDetails() {

        final JsonNode json = request().body().asJson();

        final UserDetails userDetails = Json.fromJson(json, UserDetails.class);

        if (null == userDetails.getName()) {
            return badRequest("Name  must be provided");
        }

        if (null == userDetails.getMobileNumber()) {
            return badRequest("MobileNumber  must be provided");
        }

        final String password = json.get("password").asText();
        if (null == password) {
            return badRequest("Missing mandatory parameters");
        }

        final String salt = generateSalt();

        final String hash = generateHash(salt, password, HASH_ITERATIONS);

        userDetails.setHashIterations(HASH_ITERATIONS);
        userDetails.setSalt(salt);
        userDetails.setPasswordHash(hash);

        LOGGER.debug("userdetails {}", userDetails);
        userDao.create(userDetails);

        final JsonNode result = Json.toJson(userDetails);

        return ok(result);
        //return null;
    }

    @Transactional
    public Result updateUserDetails() {


        final JsonNode json = request().body().asJson();
        final UserDetails userDetailsUpdate = Json.fromJson(json, UserDetails.class);

        final String accessToken = json.get("Token").asText();
        LOGGER.debug(accessToken);
        final UserDetails userDetails=  userDao.findUserByAuthToken(accessToken);


        userDetails.setName(userDetailsUpdate.getName());
        userDetails.setMobileNumber(userDetailsUpdate.getMobileNumber());
        userDetails.setPassword(userDetailsUpdate.getPassword());

        final String salt = generateSalt();

        final String hash = generateHash(salt, userDetailsUpdate.getPassword(), HASH_ITERATIONS);

        userDetails.setHashIterations(HASH_ITERATIONS);
        userDetails.setSalt(salt);
        userDetails.setPasswordHash(hash);

        LOGGER.debug("userdetails {}", userDetails);

        final JsonNode result = Json.toJson(userDao.update(userDetails));
        return ok(result);
    }

    @Transactional
    public Result resetPassword() {


        final JsonNode json = request().body().asJson();
        final UserDetails userDetailsUpdate = Json.fromJson(json, UserDetails.class);

        final String mobileNumber = json.get("mobileNumber").asText();

        final String password = json.get("confirm_password").asText();
        if (null == password || null == mobileNumber) {
            return badRequest("Missing mandatory parameters");
        }

        final UserDetails existingUser = userDao.findUserByMobileNumber(mobileNumber);


        if (null == existingUser) {
            return unauthorized("Wrong username");
        }

        final String salt = existingUser.getSalt();
        final int iterations = existingUser.getHashIterations();
        final String hash = generateHash(salt, password, iterations);

        if (!existingUser.getPasswordHash().equals(hash)) {
            return unauthorized("Wrong password");
        }
        final String new_hash = generateHash(salt, json.get("new_password").asText(), HASH_ITERATIONS);

        existingUser.setPasswordHash(new_hash);
        existingUser.setPassword(json.get("new_password").asText());

        userDao.update(existingUser);

        final JsonNode result = Json.toJson(existingUser);

        return ok(result);

    }


    private String generateSalt() {

        //return "ABC";

        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 3) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;
    }



    private String generateHash(String salt, String password, int iterations) {
        try {

            final String contat = salt + ":" + password;

            // TODO Run in a loop x iterations
            // TODO User a better hash function
            final MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(contat.getBytes());
            final String passwordHash = BaseEncoding.base16().lowerCase().encode(messageDigest);

            LOGGER.debug("Password hash {}", passwordHash);

            return passwordHash;
        } catch (NoSuchAlgorithmException e) {
            //e.printStackTrace();
            return null;
        }
    }


    @Transactional
    public Result signInUser() {

        final JsonNode json = request().body().asJson();

        final String mobileNumber = json.get("mobileNumber").asText();
        final String password = json.get("password").asText();
        if (null == password || null == mobileNumber) {
            return badRequest("Missing mandatory parameters");
        }

        final UserDetails existingUser = userDao.findUserByMobileNumber(mobileNumber);

        if (null == existingUser) {
            return unauthorized("Wrong username");
        }

        final String salt = existingUser.getSalt();
        final int iterations = existingUser.getHashIterations();
        final String hash = generateHash(salt, password, iterations);

        if (!existingUser.getPasswordHash().equals(hash)) {
            return unauthorized("Wrong password");
        }

        existingUser.setAccessToken(generateAccessToken());

        userDao.update(existingUser);

        final JsonNode result = Json.toJson(existingUser);

        return ok(result);
    }



    private String generateAccessToken() {

        // TODO Generate a random string of 20 (or more characters)

        String Token = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder at = new StringBuilder();
        Random rnd = new Random();
        while (at.length() < 8) { // length of the random string.
            int index = (int) (rnd.nextFloat() * Token.length());
            at.append(Token.charAt(index));
        }
        String AccessToken = at.toString();
        return AccessToken;
    }

    @Transactional
    public Result UserProfile() {
        final JsonNode json = request().body().asJson();

        final String Token = json.get("accessToken").asText();

        if (null == Token ) {

            return badRequest("Missing mandatory parameters");
        }
        final UserDetails user = userDao.findUserByAuthToken(Token);

        final JsonNode result = Json.toJson(user);

        return ok(result);
    }



    @Transactional
    public Result signOutUser() {

        final JsonNode json = request().body().asJson();

        final String Token = json.get("accessToken").asText();

        if (null == Token ) {

            return badRequest("Missing mandatory parameters");
        }

        final UserDetails user = userDao.findUserByAuthToken(Token);

        if (null == user) {
            return unauthorized("Wrong username");
        }

        user.setAccessToken(null);

        userDao.update(user);
        final JsonNode result = Json.toJson(user);

        return ok(result);
    }

}

