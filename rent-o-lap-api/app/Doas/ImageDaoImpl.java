package Doas;

import controllers.DeviceController;
import models.DeviceDetails;
import models.Image;
import play.Logger;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public class ImageDaoImpl implements ImageDao {

    private final static Logger.ALogger LOGGER = Logger.of(DeviceController.class);

    final JPAApi jpaApi;

    @Inject
    public ImageDaoImpl(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }

    @Override
    public String[] getImageById(Integer id){

        LOGGER.debug("ID="+ id);

        if(null == id){
            throw new IllegalArgumentException("id must be provided");
        }

        List<String> img_list;
        String[] array;

        try{
            String queryString = "SELECT imageUrl FROM Image WHERE deviceDetails.id = '" + id+ "'";
            TypedQuery<String> query = jpaApi.em().createQuery(queryString, String.class);
            img_list = query.getResultList();
            array = img_list.toArray(new String[0]);
        }
        catch(NoResultException nre){
            throw new IllegalArgumentException("No image found");
        }

        return array;
    }

    @Override
    public Image create(Image entity) {
        if(null == entity)
            throw new IllegalArgumentException("Details must be provided");
        jpaApi.em().persist(entity);
        return entity;
    }

    @Override
    public Optional<Image> read(String id) {
        return Optional.empty();
    }

    @Override
    public Image update(Image entity) {
        return null;
    }

    @Override
    public Image delete(String id) {

        if (null == id) {
            throw new IllegalArgumentException("Book id must be provided");
        }

        final Image existingUrl = jpaApi.em().find(Image.class, id);



        if (null == existingUrl) {
            return null;
        }


        jpaApi.em().remove(existingUrl);

        return existingUrl;
    }

    @Override
    public Collection<Image> all() {
        return null;
    }
}