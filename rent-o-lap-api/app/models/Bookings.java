package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class Bookings {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("booking_id")
    private Integer id;

    @Basic
    @JsonProperty("device_id")
    private Integer deviceId;

    @Basic
    @JsonProperty("device_brand")
    private String  deviceBrand;

    @Basic
    @JsonProperty("device_model")
    private String deviceModel;

    @Basic
    @JsonIgnore
    private Integer userId;

    @Transient
    @JsonProperty("accessToken")
    private String accessToken;

    @Basic
    @JsonProperty("from_date")
    private String fromDate;

    @Basic
    @JsonProperty("to_date")
    private String toDate;

    public Bookings(Integer id, Integer deviceId, String deviceBrand, String deviceModel, Integer userId, String accessToken, String fromDate, String toDate) {
        this.id = id;
        this.deviceId = deviceId;
        this.deviceBrand = deviceBrand;
        this.deviceModel = deviceModel;
        this.userId = userId;
        this.accessToken = accessToken;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }

    public Bookings(){

    }

   public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Integer deviceId) {
        this.deviceId = deviceId;
    }

    public Integer getUserID() {
        return userId;
    }

    public void setUserID(Integer userID) {
        this.userId = userID;
    }

    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
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

}
