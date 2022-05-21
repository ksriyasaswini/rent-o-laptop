package controllers;

import Doas.AuthenticationDao;
import Doas.UserDao;
import com.fasterxml.jackson.databind.JsonNode;
import com.twilio.rest.chat.v1.service.User;
import models.Authentication;
import models.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import play.Logger;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.Optional;
import java.util.Random;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.api.v2010.account.MessageCreator;
import com.twilio.type.PhoneNumber;

public class AuthenticationController extends Controller {
    private final static Logger.ALogger LOGGER = Logger.of(UserController.class);


    final JPAApi jpaApi;

    @Autowired
    final AuthenticationDao authenticationDao;
    final UserDao userDao;

    @Inject
    public AuthenticationController(JPAApi jpaApi, AuthenticationDao authenticationDao, UserDao userDao) {
        this.jpaApi = jpaApi;
        this.authenticationDao = authenticationDao;
        this.userDao = userDao;
    }

    @Transactional
    public Result createauthentication() {
        System.out.println("Request"+request().body().asText());
        final JsonNode json = request().body().asJson();

        System.out.println("JSON"+json);

        final Authentication authentication = Json.fromJson(json, Authentication.class);

        if (null == authentication.getMobileNumber()) {
            return badRequest("MobileNumber must be provided");
        }
        System.out.println(" Origin :"+authentication.getOrigin());
        final String otp = generateOTP();
        authentication.setOTP(otp);

        final Authentication existing_mobile = authenticationDao.findUserByMobileNumber(authentication.getMobileNumber());
        UserDetails existing_user = null;
        if(authentication.getOrigin().toString().equals("reset"))
             existing_user = userDao.findUserByMobileNumber(authentication.getMobileNumber());

        if(null == existing_mobile) {
            System.out.println(" Inside existing_mobile null");

            if (authentication.getOrigin().toString().equals("signup") || existing_user != null) {
                System.out.println(" Inside origin signup");
                sendSMS(authentication);
                authenticationDao.create(authentication);
            } else {
                System.out.println(" Inside existing_mobile null ,  origin not signup");
                return badRequest("Need to signup first");
            }
        }
        else {
            System.out.println(" Inside existing_mobile not null");
            sendSMS(authentication);
            authenticationDao.update(authentication);
        }

        final JsonNode result = Json.toJson(authentication);

        return ok(result);
    }

    public void sendSMS(Authentication authentication) {
        Twilio.init("ACebc6771372ee7082a1e6570d0a5d5981","df7a56860d14b707e5c93fcd794ba37a");
        String mobileNo = authentication.getMobileNumber();
        if(!(mobileNo.startsWith("+91")))
            mobileNo = "+91"+mobileNo;
        MessageCreator message = Message.creator(
                new PhoneNumber(mobileNo),
                new PhoneNumber("+12765224215"), "Hi "
                        + " your OTP to activate account : " +authentication.getOTP() );
        message.create();
    }

    private String generateOTP() {

        String OTPCHARS = "0123456789";
        StringBuilder otp = new StringBuilder();
        Random rnd = new Random();
        while (otp.length() < 6) { // length of the random string.
            int index = (int) (rnd.nextFloat() * OTPCHARS.length());
            otp.append(OTPCHARS.charAt(index));
        }
        String otpStr = otp.toString();
        return otpStr;
    }

}
