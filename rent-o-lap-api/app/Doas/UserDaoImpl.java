package Doas;

import models.Authentication;
import models.UserDetails;
import play.Logger;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;

import javax.inject.Inject;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public class UserDaoImpl implements UserDao {

    private final static Logger.ALogger LOGGER = Logger.of(UserDetails.class);

    final JPAApi jpaApi;

    @Inject
    public UserDaoImpl(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }

    @Override
    public UserDetails create (UserDetails userDetails) {
        LOGGER.debug("in userdao create");

        if (null == userDetails) {
            throw new IllegalArgumentException("Mobile Number must be provided");
        }
        final String mobileNumber = userDetails.getMobileNumber();

        TypedQuery<String> query = jpaApi.em().createQuery("SELECT OTP FROM Authentication a WHERE a.mobileNumber = '" + mobileNumber +"' ", String.class);
        String otp = query.getSingleResult();

            if (Integer.parseInt(otp) == Integer.parseInt(userDetails.getOtp())) {
                LOGGER.debug("otp from userdetails {}", userDetails.getOtp());
                System.out.println("otp- user: " + userDetails.getOtp());
                jpaApi.em().persist(userDetails);
                return  userDetails;
            }
            else
                return null;
    }

    @Override
    public Optional<UserDetails> read(String str) {
        return Optional.empty();
    }

    @Override
    public UserDetails update(UserDetails userDetails) {
        if (null == userDetails) {
            throw new IllegalArgumentException("Details must be provided");
        }

        if (null == userDetails.getId()) {
            throw new IllegalArgumentException("User Id must be provided");
        }

        final UserDetails existingUser = jpaApi.em().find(UserDetails.class, userDetails.getId());
        if (null == existingUser) {
            return null;
        }
        jpaApi.em().merge(userDetails);
        UserDetails userDetails_new = jpaApi.em().find(UserDetails.class, userDetails.getId());
        return userDetails_new;
        //existingBook.setTitle(book.getTitle());
//        userDetails.setAccessToken(userDetails.getAccessToken());
//
//        jpaApi.em().persist(userDetails);
//
//        return userDetails;

    }

    @Override
    public UserDetails delete(String str) {
        return null;
    }

    @Override
    public Collection<UserDetails> all() {
        TypedQuery<UserDetails> query1 = jpaApi.em().createQuery("SELECT u from UserDetails u", UserDetails.class);
       // UserDetails existingUser = query1.getSingleResult();
        List<UserDetails> userDetails= query1.getResultList();

        return userDetails;
    }

    @Override
    public UserDetails findUserByAuthToken(String Token) {
        TypedQuery<UserDetails> query = jpaApi.em().createQuery("SELECT u from UserDetails u where u.accessToken = '"+Token+"'", UserDetails.class);
        UserDetails userDetails = query.getSingleResult();

        if(null == userDetails) {
            return null;
        }
        return userDetails;
    }

    @Override
    public UserDetails findUserByMobileNumber(String mobileNumber) {
        UserDetails existingUser = null;
        TypedQuery<UserDetails> query1 = jpaApi.em().createQuery("SELECT u from UserDetails u where mobileNumber = '"+mobileNumber+"'", UserDetails.class);
        try{
        existingUser = query1.getSingleResult();}
        catch (NoResultException nre){}

        if(null == existingUser) {
            return null;
        }
        return existingUser;
    }
}

