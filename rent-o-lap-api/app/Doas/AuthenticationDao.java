package Doas;

import models.Authentication;

public interface AuthenticationDao extends CrudDao<Authentication, String> {
    Authentication findUserByMobileNumber(String mobileNumber);
}
