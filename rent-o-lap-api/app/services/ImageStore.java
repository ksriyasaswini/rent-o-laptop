package services;


import play.mvc.Http;

import java.io.File;
import java.io.InputStream;
import java.net.URL;

public interface ImageStore {

    String save(File file);

    InputStream get(String id);

    boolean delete(String id);

    URL downloadUrl(String id, Http.Request request);

}