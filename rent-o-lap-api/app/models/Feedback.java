package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Integer id;

    @Basic
    @JsonProperty("device_review")
    private String deviceReview;

    @Basic
    @JsonProperty("device_rating")
    private Integer deviceRating;

    @Basic
    @JsonProperty("device_id")
    private Integer deviceID;

    @Transient
    @JsonIgnore
    private Float averageRating;

    public Feedback(Integer id, String deviceReview, Integer deviceRating, Integer deviceID) {
        this.id = id;
        this.deviceReview = deviceReview;
        this.deviceRating = deviceRating;
        this.deviceID = deviceID;
    }

    public Feedback(){

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDeviceReview() {
        return deviceReview;
    }

    public void setDeviceReview(String deviceReview) {
        this.deviceReview = deviceReview;
    }

    public Integer getDeviceRating() {
        return deviceRating;
    }

    public void setDeviceRating(Integer deviceRating) {
        this.deviceRating = deviceRating;
    }

    public Integer getDeviceID() {
        return deviceID;
    }

    public Float getAverafeRating() {
        return averageRating;
    }

    public void setAverafeRating(Float averafeRating) {
        this.averageRating = averafeRating;
    }

    public void setDeviceID(Integer deviceID) {
        this.deviceID = deviceID;
    }

}
