package Doas;
import models.Bookings;
import models.Feedback;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.persistence.TypedQuery;
import javax.persistence.Query;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public class BookingDaoImpl implements BookingDao {

    final JPAApi jpaApi;

    @Inject
    public BookingDaoImpl(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }

    public Bookings create (Bookings booking) {

        if (null == booking) {
            throw new IllegalArgumentException("Valid Booking must be provided");
        }

        jpaApi.em().persist(booking);
        return booking;

    }

    @Override
    public Optional<Bookings> read(Integer id) {
        return Optional.empty();
    }

    @Override
    public Bookings update(Bookings booking) {
        return null;
    }

    @Override
    public Bookings delete(Integer id) {
        return null;
    }

    @Override
    public Collection<Bookings> all() {
        return null;
    }

    public List<Bookings> getBookingByUserID(Integer id) {
        TypedQuery<Bookings> query1 = jpaApi.em().createQuery("SELECT b from Bookings b where b.userId = "+id, Bookings.class);
        List<Bookings> bookings = query1.getResultList();

        if(null == bookings) {
            return null;
        }
        return bookings;

    }

    public List<Bookings> getBookingByDeviceID(Integer id) {
        TypedQuery<Bookings> query1 = jpaApi.em().createQuery("SELECT b from Bookings b where b.deviceId="+id, Bookings.class);
        List<Bookings> bookings = query1.getResultList();

        if(null == bookings) {
            return null;
        }
        return bookings;

    }

    public Integer deleteBookingByDeviceId(Integer id) {
        TypedQuery<Bookings> query1 = jpaApi.em().createQuery("DELETE from Bookings b where b.deviceId = "+id, Bookings.class);
        int rowsDeleted = query1.executeUpdate();

        if(0 == rowsDeleted) {
            return null;
        }
        return rowsDeleted;
    }

    public Integer deleteAllBookingsByUserId(Integer id) {
        Query query1 = jpaApi.em().createQuery("DELETE from Bookings b where b.userId = "+id);
        int rowsDeleted = query1.executeUpdate();

        if(0 == rowsDeleted) {
            return 0;
        }
        return rowsDeleted;
    }

    public Integer deleteParticularBookingOfUser(Integer userId,Integer deviceId ){

        Query query1 = jpaApi.em().createQuery("DELETE from Bookings b where b.userId = "+userId+" AND b.deviceId ="+deviceId);
        int rowsDeleted = query1.executeUpdate();

        if(0 == rowsDeleted) {
            return 0;
        }
        return rowsDeleted;
    }

    public Integer updateBooking(Integer userId,Integer deviceId, String fromDate , String toDate){
        Query query1 = jpaApi.em().createQuery("UPDATE Bookings b SET b.formDate = "+fromDate+" b.toDate = "+toDate+" where b.userId = "+userId+" AND b.deviceId ="+deviceId);
        int rowsDeleted = query1.executeUpdate();

        if(0 == rowsDeleted) {
            return 0;
        }
        return rowsDeleted;
    }


    public List<Bookings> userBookingsOfDevice(Integer userId,Integer deviceId ){

        TypedQuery<Bookings> query1 = jpaApi.em().createQuery("SELECT b from Bookings b where b.userId = "+userId+" AND b.deviceId ="+deviceId,Bookings.class);
        List<Bookings> bookings = query1.getResultList();
        if(null == bookings) {
            return null;
        }
        return bookings;
    }
    public List<Bookings> bookingsOfOtherUsers(Integer userId,Integer deviceId ){

        TypedQuery<Bookings> query1 = jpaApi.em().createQuery("SELECT b from Bookings b where NOT b.userId = "+userId+" AND b.deviceId ="+deviceId,Bookings.class);
        List<Bookings> bookings = query1.getResultList();
        if(null == bookings) {
            return null;
        }
        return bookings;
    }
}
