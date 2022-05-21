package Doas;
import models.*;

import java.util.Optional;
import java.util.Collection;
import java.util.Optional;

public interface DevicesDao extends CrudDao<DeviceDetails, Integer>{
    DeviceDetails getDeviceDetailsByID(int id);
    Collection<DeviceDetails> getDeviceDetailsByBrand(String brand);
    Collection<DeviceDetails> getFilteredDeviceDetails(String queryStr);
    Collection<DeviceDetails> getUserDevices(Integer userId);
}
