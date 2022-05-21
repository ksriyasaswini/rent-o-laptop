package models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class Image {

    @Id
    @JsonProperty("imageUrl")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name="id")
    private DeviceDetails deviceDetails;

    public Image(String imageUrl){

        this.imageUrl=imageUrl;
    }

    public Image() {
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public DeviceDetails getDeviceDetails() {
        return deviceDetails;
    }

    public void setDeviceDetails(DeviceDetails deviceDetails) {
        this.deviceDetails = deviceDetails;
    }
}
