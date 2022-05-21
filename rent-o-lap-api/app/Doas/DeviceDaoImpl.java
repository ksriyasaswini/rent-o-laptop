package Doas;
import com.fasterxml.jackson.databind.JsonNode;
import models.DeviceDetails;
import models.UserDetails;
import play.db.jpa.JPAApi;
import play.libs.Json;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public class DeviceDaoImpl implements DevicesDao {
    final JPAApi jpaApi;
     private EntityManager entityManager;

    @Inject
    public DeviceDaoImpl(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }

    @Override
    public DeviceDetails create (DeviceDetails deviceDetails) {
        System.out.println("In device create");
        System.out.println("device details"+ deviceDetails.getDeviceModel()+"\n"+deviceDetails.getRAMSize());

        if (null == deviceDetails) {
            throw new IllegalArgumentException("Mobile Number must be provided");
        }

        jpaApi.em().persist(deviceDetails);
        System.out.println("ID"+deviceDetails.getId());
        return deviceDetails;

    }

    @Override
    public Optional<DeviceDetails> read(Integer id) {
        if(null == id) {
            throw new IllegalArgumentException("Id must be provided");
        }

        final DeviceDetails deviceDetails = jpaApi.em().find(DeviceDetails.class, id);
        return deviceDetails != null ? Optional.of(deviceDetails) : Optional.empty();
    }

    @Override
    public DeviceDetails update(DeviceDetails deviceDetails) {
        jpaApi.em().merge(deviceDetails);
        deviceDetails= getDeviceDetailsByID(deviceDetails.getId());
        return deviceDetails;
    }

    @Override
    public DeviceDetails delete(Integer id) {
        DeviceDetails deviceDetails= getDeviceDetailsByID(id);
        jpaApi.em().remove(deviceDetails);
        return deviceDetails;
    }

    @Override
    public Collection<DeviceDetails> all() {
        TypedQuery<DeviceDetails> query = jpaApi.em().createQuery("SELECT d from DeviceDetails d ORDER BY date", DeviceDetails.class);
        List<DeviceDetails> deviceDetailsList= query.getResultList();

        return deviceDetailsList;
    }


    public DeviceDetails getDeviceDetailsByID(int id) {

        TypedQuery<DeviceDetails> query1 = jpaApi.em().createQuery("SELECT d from DeviceDetails d where id = '"+id+"'", DeviceDetails.class);
        DeviceDetails device = query1.getSingleResult();

        if(null == device) {
            return null;
        }
        return device;
    }

    @Override
    public Collection<DeviceDetails> getDeviceDetailsByBrand(String brand) {

        TypedQuery<DeviceDetails> query = jpaApi.em().createQuery("SELECT d from DeviceDetails d where deviceBrand like '"+brand+"'"+" ORDER BY date", DeviceDetails.class);
        List<DeviceDetails> devices = query.getResultList();

        if(null == devices) {
            return null;
        }
        return devices;
    }


    @Override
    public  Collection<DeviceDetails> getFilteredDeviceDetails(String queryStr)
    {
        String Query = "SELECT d from DeviceDetails d";
        if(!queryStr.isEmpty()){
            Query = Query+" where "+queryStr;
        }
        TypedQuery<DeviceDetails> query = jpaApi.em().createQuery(Query, DeviceDetails.class);
        List<DeviceDetails> devices = query.getResultList();
        if(null == devices) {
            return null;
        }
        return devices;

    }

    @Override
    public Collection<DeviceDetails> getUserDevices(Integer userId) {
        if(null == userId)
            return null;

        TypedQuery<DeviceDetails> query = jpaApi.em().createQuery("SELECT d from DeviceDetails d where d.userId="+userId, DeviceDetails.class);
        Collection<DeviceDetails> devices = query.getResultList();
        return devices;
    }


}
