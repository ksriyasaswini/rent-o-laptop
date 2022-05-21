package controllers;
import java.util.*;
import Doas.BookingDao;
import Doas.DevicesDao;
import Doas.UserDao;
import Doas.FeedbackDao;
import com.fasterxml.jackson.databind.JsonNode;
import models.Bookings;
import models.DeviceDetails;
import models.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

public class BookingsController extends Controller {
    @Inject
    public BookingsController(JPAApi jpaApi, BookingDao bookingDao, UserDao userDao, DevicesDao devicesDao) {
        this.jpaApi = jpaApi;
        this.bookingDao = bookingDao;
        this.userDao = userDao;
        this.devicesDao = devicesDao;
    }
    final JPAApi jpaApi;

    @Autowired
    final BookingDao bookingDao;
    final UserDao userDao;
    final DevicesDao devicesDao;

    @Transactional
    public Result createBooking() {
        final JsonNode json = request().body().asJson();
        Bookings bookings = Json.fromJson(json, Bookings.class);
        UserDetails user= userDao.findUserByAuthToken(bookings.getAccessToken());
        DeviceDetails deviceDetails = devicesDao.getDeviceDetailsByID(bookings.getDeviceId());
        if(null==user){
            System.out.println("Invalid AccessToken");
            return null;
        }
        bookings.setUserID(user.getId());

        bookings.setDeviceBrand(deviceDetails.getDeviceBrand());
        bookings.setDeviceModel(deviceDetails.getDeviceModel());

        bookings = bookingDao.create(bookings);
        final JsonNode result = Json.toJson(bookings);
        return ok(result);
        //return null;
    }

    @Transactional
    public Result getBookingsByUserID() {
        final JsonNode json = request().body().asJson();
        String accessToken = json.get("accessToken").asText();
        UserDetails user= userDao.findUserByAuthToken(accessToken);
        List<Bookings> bookings = bookingDao.getBookingByUserID(user.getId());

        final JsonNode result = Json.toJson(bookings);
        return ok(result);

    }

    @Transactional
    public Result getBookingsByDeviceID(Integer id) {
        List<Bookings> bookings = bookingDao.getBookingByDeviceID(id);
        final JsonNode result = Json.toJson(bookings);
        return ok(result);
    }
    @Transactional
    public Result deleteBooking(Integer id){
        final JsonNode json = request().body().asJson();
        String accessToken = json.get("accessToken").asText();
        UserDetails user= userDao.findUserByAuthToken(accessToken);
        Integer rowsDeleted = bookingDao.deleteParticularBookingOfUser(user.getId(),id);
        final JsonNode result = Json.toJson(rowsDeleted);
        return ok(result);

    }

    public Result updateBooking(Integer id){
        final JsonNode json = request().body().asJson();
        String accessToken = json.get("accessToken").asText();
        UserDetails user= userDao.findUserByAuthToken(accessToken);
        Integer rowsDeleted = bookingDao.deleteParticularBookingOfUser(user.getId(),id);
        final JsonNode result = Json.toJson(rowsDeleted);
        return ok(result);

    }


}
