package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.*;

@Entity
public class DeviceDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Integer id;

    @Basic
    @JsonProperty("device_brand")
    private String deviceBrand;

    @Basic
    @JsonProperty("device_model")
    private String deviceModel;

    @Transient
    @JsonProperty("image_urls")
    private String[] imageURLs;


    @Basic
    @JsonProperty("charger")
    private boolean charger;


    @Basic
    @JsonProperty("processor")
    private String processor;


    @Basic
    @JsonProperty("storage")
    private String storage;


    @Basic
    @JsonProperty("RAM_size")
    private String RAMSize;


    @Basic
    @JsonProperty("latitude")
    private String latitude;


    @Basic
    @JsonProperty("longitude")
    private String longitude;


    @Basic
    @JsonProperty("rent_amount")
    private String rentAmount;

    @Basic
    @Transient
    @JsonProperty("access_Token")
    private String access_token;

    @Basic
    @JsonProperty("user_id")
    private Integer userId;

    @JsonIgnore
    @Transient
    @JsonProperty("booked_by_user")
    private List<Bookings> userBookings;

    @JsonIgnore
    @Transient
    @JsonProperty("booked_dates")
    private List<Bookings> otherBookings;

    @Basic
    @JsonProperty("description")
    private String description;

    @JsonIgnore
    @Basic
    @JsonProperty("date")
    private Date date = new Date();

    public DeviceDetails(Integer id, String deviceBrand, String deviceModel, String[] imageURLs, boolean charger, String processor, String storage, String RAMSize, String latitude, String longitude, String rentAmount, String access_token, Integer user_id, List<Bookings> userBookings, List<Bookings> otherBookings, String description, Date date) {
        this.id = id;
        this.deviceBrand = deviceBrand;
        this.deviceModel = deviceModel;
        this.imageURLs = imageURLs;
        this.charger = charger;
        this.processor = processor;
        this.storage = storage;
        this.RAMSize = RAMSize;
        this.latitude = latitude;
        this.longitude = longitude;
        this.rentAmount = rentAmount;
        this.access_token = access_token;
        this.userId = user_id;
        this.userBookings = userBookings;
        this.otherBookings = otherBookings;
        this.description = description;
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public DeviceDetails(){

    }

    public List<Bookings> getUserBookings() {
        return userBookings;
    }

    public void setUserBookings(List<Bookings> userBookings) {
        this.userBookings = userBookings;
    }

    public List<Bookings> getOtherBookings() {
        return otherBookings;
    }

    public void setOtherBookings(List<Bookings> otherBookings) {
        this.otherBookings = otherBookings;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDeviceBrand() {
        return deviceBrand;
    }

    public void setDeviceBrand(String deviceBrand) {
        this.deviceBrand = deviceBrand;
    }

    public String getDeviceModel() {
        return deviceModel;
    }

    public void setDeviceModel(String deviceModel) {
        this.deviceModel = deviceModel;
    }

    public String[] getImageURLs() {
        return imageURLs;
    }

    public void setImageURLs(String[] imageURLs) {
        this.imageURLs = imageURLs;
    }

    public boolean isCharger() {
        return charger;
    }

    public void setCharger(boolean charger) {
        this.charger = charger;
    }

    public String getProcessor() {
        return processor;
    }

    public void setProcessor(String processor) {
        this.processor = processor;
    }

    public String getStorage() {
        return storage;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    public String getRAMSize() {
        return RAMSize;
    }

    public void setRAMSize(String RAMSize) {
        this.RAMSize = RAMSize;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getRentAmount() {
        return rentAmount;
    }

    public void setRentAmount(String rentAmount) {
        this.rentAmount = rentAmount;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public Integer getUser_id() {
        return userId;
    }

    public void setUser_id(Integer user_id) {
        this.userId = user_id;
    }


}