package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Basic
    @JsonProperty("mobileNumber")
    private  String mobileNumber;

    @Basic
    @JsonProperty("name")
    private String name;

    @Transient
    @JsonProperty("password")
    private String password;

    @Transient
    @JsonProperty("otp")
    private String otp;

    @Basic
    @JsonIgnore
    private String passwordHash;

    @Basic
    @JsonIgnore
    private String salt;

    @Basic
    @JsonIgnore
    private Integer hashIterations;

    @Basic
    private String accessToken;

    @OneToOne
    private Authentication authentication;



    public Authentication getAuthentication() {
        return authentication;
    }

    public void setAuthentication(Authentication authentication) {
        this.authentication = authentication;
    }

    public UserDetails() {
    }

    public UserDetails(Integer id, String mobileNumber, String name, String password, String otp, String passwordHash, String salt, Integer hashIterations, String accessToken) {
        this.id = id;
        this.mobileNumber = mobileNumber;
        this.name = name;
        this.password = password;
        this.otp = otp;
        this.passwordHash = passwordHash;
        this.salt = salt;
        this.hashIterations = hashIterations;
        this.accessToken = accessToken;
    }

    //    public UserDetails(String mobileNumber, String name, String password, String otp, String passwordHash, String salt, Integer hashIterations, String accessToken) {
//        this.mobileNumber = mobileNumber;
//        this.name = name;
//        this.password = password;
//        this.otp = otp;
//        this.passwordHash = passwordHash;
//        this.salt = salt;
//        this.hashIterations = hashIterations;
//        this.accessToken = accessToken;
//    }
//
    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Integer getHashIterations() {
        return hashIterations;
    }

    public void setHashIterations(Integer hashIterations) {
        this.hashIterations = hashIterations;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}