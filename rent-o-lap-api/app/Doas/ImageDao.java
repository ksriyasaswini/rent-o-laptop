package Doas;

import models.Image;

import java.util.Collection;

public interface ImageDao extends CrudDao<Image, String>  {

    String[] getImageById(Integer id);
}