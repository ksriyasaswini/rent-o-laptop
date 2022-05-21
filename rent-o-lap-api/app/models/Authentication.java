package models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class Authentication {
    @Id
    @JsonProperty("mobileNumber")
    private String mobileNumber;

    @Basic
    private String OTP;

    @Basic
    @JsonProperty("origin")
    private String origin;

    public Authentication() {
    }

    public Authentication(String mobileNumber, String OTP, String origin) {
        this.mobileNumber = mobileNumber;
        this.OTP = OTP;
        this.origin = origin;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getOTP() {
        return OTP;
    }

    public void setOTP(String OTP) {
        this.OTP = OTP;
    }


    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }
}
