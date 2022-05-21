package Doas;

import models.Authentication;
import models.DeviceDetails;
import models.UserDetails;
import play.Logger;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.persistence.*;
import java.util.Collection;
import java.util.Optional;

public class AuthenticationDaoImpl implements AuthenticationDao{
    private final static Logger.ALogger LOGGER = Logger.of(Authentication.class);

    final JPAApi jpaApi;

    @Inject
    public AuthenticationDaoImpl(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }

    @Override
    public Authentication findUserByMobileNumber(String mobileNumber) {
        Authentication authentication = null;

        TypedQuery<Authentication> query = jpaApi.em().createQuery("SELECT a from Authentication a where a.mobileNumber = '"+mobileNumber+"'", Authentication.class);
        try {
            authentication = query.getSingleResult();
        }
        catch (NoResultException nre){}

        if(null == authentication) {
            return null;
        }
        return authentication;
    }

    @Override
    public Authentication create(Authentication authentication) {
       LOGGER.info("In Authentication create");
        if (null == authentication) {
            throw new IllegalArgumentException("Mobile Number must be provided");
        }

        jpaApi.em().persist(authentication);
        return authentication;
    }

    @Override
    public Optional<Authentication> read(String mobileNumber) {
         if(null == mobileNumber) {
        throw new IllegalArgumentException("Id must be provided");
    }

    final Authentication authentication = jpaApi.em().find(Authentication.class, mobileNumber);
        return authentication != null ? Optional.of(authentication) : Optional.empty();
    }

    @Override
    public Authentication update(Authentication authentication) {
        if (null == authentication) {
            throw new IllegalArgumentException("Mobile Number must be provided");
        }
        jpaApi.em().merge(authentication);
        Authentication authDetails = jpaApi.em().find(Authentication.class, authentication.getMobileNumber());
        return authDetails;
    }

    @Override
    public Authentication delete(String mobileNumber) {
        Authentication auth = jpaApi.em().find(Authentication.class,mobileNumber);
        if(null == auth){
            return null;
        }
        jpaApi.em().remove(auth);
        return auth;
    }

    @Override
    public Collection<Authentication> all() {
        return null;
    }
}
