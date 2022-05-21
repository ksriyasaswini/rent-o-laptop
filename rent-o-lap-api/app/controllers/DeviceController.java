package controllers;
import java.util.*;
import Doas.BookingDao;
import Doas.DevicesDao;
import Doas.ImageDao;
import Doas.UserDao;
import com.fasterxml.jackson.databind.JsonNode;
import models.DeviceDetails;
import models.Image;
import models.UserDetails;
import models.Bookings;
import org.springframework.beans.factory.annotation.Autowired;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import scala.util.parsing.json.JSONArray;
import scala.util.parsing.json.JSONObject;
import services.ImageStore;

import java.lang.String;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import javax.inject.Inject;

public class DeviceController extends Controller {


    @Inject
    public DeviceController(JPAApi jpaApi, DevicesDao devicesDao, ImageDao imageDao, UserDao userDao, BookingDao bookingDao,ImageStore imageStore) {
        this.jpaApi = jpaApi;
        this.devicesDao = devicesDao;
        this.imageDao = imageDao;
        this.userDao = userDao;
        this.bookingDao = bookingDao;
        this.imageStore = imageStore;
    }

    final JPAApi jpaApi;


    @Autowired
    final DevicesDao devicesDao;
    final ImageDao imageDao;
    final UserDao userDao;
    final BookingDao bookingDao;
    final ImageStore imageStore;

    @Transactional
    public Result createDeviceDetails() {

        final JsonNode json = request().body().asJson();
//        String[] imageUrls =new String[2];
//        imageUrls[0] = "https://imagestore-hackathon.s3.ap-south-1.amazonaws.com/test-image-2.jpg";
//        imageUrls[1] = "https://imagestore-hackathon.s3.ap-south-1.amazonaws.com/test-image-2.1.jpg)";

        final DeviceDetails deviceDetails = Json.fromJson(json, DeviceDetails.class);

        final String access_Token = deviceDetails.getAccess_token();
        UserDetails userDetails = userDao.findUserByAuthToken(access_Token);

        deviceDetails.setUser_id(userDetails.getId());

        DeviceDetails newDevice = devicesDao.create(deviceDetails);


      //  deviceDetails.setImageURLs(imageUrls);


        for (String url : deviceDetails.getImageURLs()) {
            System.out.println(url);
            final Image image = new Image(url);
            image.setImageUrl(url);
            image.setDeviceDetails(newDevice);
            System.out.println("image device details" + image.getDeviceDetails().getId());
            System.out.println("urls" + image.getImageUrl());
            imageDao.create(image);
        }

        final JsonNode result = Json.toJson(deviceDetails);

        return ok(result);
        //return null;
    }

    @Transactional
    public Result getDeviceDetailsById(Integer id) {

        DeviceDetails deviceDetails = devicesDao.getDeviceDetailsByID(id);

        String[] imageStrings = imageDao.getImageById(id);
        deviceDetails.setImageURLs(imageStrings);
        final JsonNode json = request().body().asJson();

        if (null != json && !json.toString().equals("{}")){
            String accessToken = json.get("accessToken").asText();
            UserDetails user = userDao.findUserByAuthToken(accessToken);
            List<Bookings> bookings = bookingDao.userBookingsOfDevice(user.getId(),id);
            deviceDetails.setUserBookings(bookings);
            List<Bookings> otherBookings = bookingDao.bookingsOfOtherUsers(user.getId(),id);
            deviceDetails.setOtherBookings(otherBookings);
        }
        else{
            List<Bookings> bookings = bookingDao.getBookingByDeviceID(id);
            deviceDetails.setOtherBookings(bookings);
        }
        final JsonNode result = Json.toJson(deviceDetails);
        return ok(result);

        //return null;
    }


    public Result getDeviceDetailsByName(String name) {

        Collection<DeviceDetails> deviceDetails = devicesDao.getDeviceDetailsByBrand(name);
        for (DeviceDetails deviceDetails_new : deviceDetails) {
            String[] image_strings = imageDao.getImageById(deviceDetails_new.getId());
            deviceDetails_new.setImageURLs(image_strings);
        }

        final JsonNode result = Json.toJson(deviceDetails);
        return ok(result);
        //return null;
    }

    @Transactional
    public Result getAllDevices() {

        Collection<DeviceDetails> deviceDetails = devicesDao.all();
        for (DeviceDetails deviceDetails_new : deviceDetails) {
            String[] image_strings = imageDao.getImageById(deviceDetails_new.getId());
            deviceDetails_new.setImageURLs(image_strings);
        }

        final JsonNode result = Json.toJson(deviceDetails);
        return ok(result);
    }

        final JsonNode result = Json.toJson(deviceDetails);
        return ok(result);
    }


    @Transactional
    public Result getFilteredDeviceDetails() {
        String queryString = "";
        Collection<DeviceDetails> deviceDetails = null;
        final JsonNode json = request().body().asJson();

        QueryFilter filter = new QueryFilter();
        if(json != null) {

            //.out.print(" Raveena ...."+ json.get("deviceBrand").asText()+"      "+json.get("deviceBrand").asText().replace("[","(").replace("]",")"));
            if (json.has("deviceBrand") && json.hasNonNull("deviceBrand")) {
                filter = filter.and(new QueryFilter("deviceBrand", convertJsonArrayToString(json.get("deviceBrand"))));

            }
            if (json.has("deviceModel")&& json.hasNonNull("deviceModel")) {
                filter = filter.and(new QueryFilter("deviceModel", convertJsonArrayToString(json.get("deviceModel"))));
            }
            if (json.has("cost")&& json.hasNonNull("cost")) {
                filter = filter.and(new QueryFilter("rentAmount", ">", json.get("cost").asText()));
            }
            if (json.has("processor")&& json.hasNonNull("processor")){
                filter = filter.and(new QueryFilter("processor", convertJsonArrayToString(json.get("processor"))));
            }
            if (json.has("RAMSize")&& json.hasNonNull("RAMSize")){
                filter = filter.and(new QueryFilter("RAMSize", ">", json.get("RAMSize").asText()));
            }
            if (json.has("storage")&& json.hasNonNull("storage")){
                filter = filter.and(new QueryFilter("storage",">",convertJsonArrayToString(json.get("storage"))));
            }

            queryString = filter.toString();
            String ordStr = " ORDER BY date DESC";
            if (json.has("sort") && json.hasNonNull("sort"))
            {
                if(json.get("sort").asInt() == 1)
                    ordStr = " ORDER BY rentAmount DESC";
                else
                    ordStr = " ORDER BY rentAmount ASC";
            }
            queryString = queryString + ordStr;
            System.out.println(" Final Query String : "+queryString);
        }

        deviceDetails = devicesDao.getFilteredDeviceDetails(queryString);

    @Transactional
    public Result getFilteredDeviceDetails() {
        String queryString = "";
        Collection<DeviceDetails> deviceDetails = null;
        final JsonNode json = request().body().asJson();

        QueryFilter filter = new QueryFilter();
        if(json != null) {

            //.out.print(" Raveena ...."+ json.get("deviceBrand").asText()+"      "+json.get("deviceBrand").asText().replace("[","(").replace("]",")"));
            if (json.has("deviceBrand") && json.hasNonNull("deviceBrand")) {
                filter = filter.and(new QueryFilter("deviceBrand", convertJsonArrayToString(json.get("deviceBrand"))));

            }
            if (json.has("deviceModel")&& json.hasNonNull("deviceModel")) {
                filter = filter.and(new QueryFilter("deviceModel", convertJsonArrayToString(json.get("deviceModel"))));
            }
            if (json.has("cost")&& json.hasNonNull("cost")) {
                filter = filter.and(new QueryFilter("rentAmount", ">", json.get("cost").asText()));
            }
            if (json.has("processor")&& json.hasNonNull("processor")){
                filter = filter.and(new QueryFilter("processor", convertJsonArrayToString(json.get("processor"))));
            }
            if (json.has("RAMSize")&& json.hasNonNull("RAMSize")){
                filter = filter.and(new QueryFilter("RAMSize", ">", json.get("RAMSize").asText()));
            }
            if (json.has("storage")&& json.hasNonNull("storage")){
                filter = filter.and(new QueryFilter("storage",">",convertJsonArrayToString(json.get("storage"))));
            }

            queryString = filter.toString();
            String ordStr = " ORDER BY date DESC";
            if (json.has("sort") && json.hasNonNull("sort"))
            {
                if(json.get("sort").asInt() == 1)
                    ordStr = " ORDER BY rentAmount DESC";
                else
                    ordStr = " ORDER BY rentAmount ASC";
            }
            queryString = queryString + ordStr;
            System.out.println(" Final Query String : "+queryString);
        }

        deviceDetails = devicesDao.getFilteredDeviceDetails(queryString);

        for(DeviceDetails deviceDetails_new : deviceDetails) {
            String[] image_strings = imageDao.getImageById(deviceDetails_new.getId());
            deviceDetails_new.setImageURLs(image_strings);
        }
        final JsonNode result = Json.toJson(deviceDetails);
        return ok(result);

    }

    String convertJsonArrayToString(JsonNode jnode)
    {
        String str="(";
        boolean isfirstStr=true;
        List<String> list = new ArrayList<>();

        if(jnode.isArray()) {
            jnode.forEach(node -> list.add(node.asText()));
            for (String str1 : list) {
                if (isfirstStr) {
                    str = str + "'" + str1 + "'";
                    isfirstStr = false;
                } else {
                    str = str + "," + "'" + str1 + "'";
                }
            }
            str = str + ")";
            return str;
        }
        else{
            str = "('"+jnode.asText()+"')";
        }

            return str;
    }


    @Transactional
    public Result updateDeviceDetails(Integer id) {
        if(null == id){
            return badRequest("Id has to be provided");
        }
        final JsonNode json = request().body().asJson();
        DeviceDetails deviceDetails = Json.fromJson(json, DeviceDetails.class);
        deviceDetails.setId(id);
        deviceDetails = devicesDao.update(deviceDetails);
        final JsonNode result = Json.toJson(deviceDetails);
        return ok(result);
    }
    @Transactional
    public Result deleteDeviceDetails(Integer id) {
        if(null == id){
            return badRequest("Id has to be provided");
        }

        DeviceDetails deviceDetails = devicesDao.delete(id);
        final JsonNode result = Json.toJson(deviceDetails);
        return ok(result);
    }

    @Transactional
    public Result getUserDevices() {
        final JsonNode json = request().body().asJson();

        final String accessToken = json.get("accessToken").asText();
        final UserDetails userDetails = userDao.findUserByAuthToken(accessToken);

        Collection<DeviceDetails> deviceDetails = devicesDao.getUserDevices(userDetails.getId());

        final JsonNode result = Json.toJson(deviceDetails);
        return ok(result);
    }

}
