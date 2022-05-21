package Doas;

import models.*;

public interface UserDao extends CrudDao<UserDetails, String>{

    UserDetails findUserByAuthToken(String Token);
    UserDetails findUserByMobileNumber(String mobileNumber);

}