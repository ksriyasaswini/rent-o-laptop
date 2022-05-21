package Doas;

import models.Bookings;

import java.util.List;

public interface BookingDao extends CrudDao<Bookings, Integer> {
        List<Bookings> getBookingByDeviceID(Integer id);

        List<Bookings> getBookingByUserID(Integer id);

        Integer deleteAllBookingsByUserId(Integer id);

        Integer deleteBookingByDeviceId(Integer id);

        Integer deleteParticularBookingOfUser(Integer userId, Integer deviceId);

        Integer updateBooking(Integer userId,Integer deviceId, String fromDate , String toDate);

        List<Bookings> userBookingsOfDevice(Integer userId,Integer deviceId );

        List<Bookings> bookingsOfOtherUsers(Integer userId,Integer deviceId );
        }