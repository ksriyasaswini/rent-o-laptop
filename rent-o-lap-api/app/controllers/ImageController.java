package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.inject.Inject;
import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import services.ImageStore;
import services.LocalFileImageStore;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ImageController extends Controller {

    private ImageStore imageStore;

    @Inject
    public ImageController(ImageStore imageStore) {
        this.imageStore = imageStore;
    }

    public Result uploadImage() {
        ArrayList<String> Images = new ArrayList();
        URL downloadUrl = null;

        List<Http.MultipartFormData.FilePart<Object>> myFiles = request().body().asMultipartFormData().getFiles();

        if (myFiles == null) {
            return badRequest("Not multipart request");
        }

        Iterator itr = myFiles.iterator();
        while(itr.hasNext()) {

            Http.MultipartFormData.FilePart<File> item = (Http.MultipartFormData.FilePart) itr.next();
            if (item == null) {
                return badRequest("Missing image file in multi part request");
            }
            Logger.debug("Content type: {}", item.getContentType());
//            if (!item.getContentType().equals("image/png")) {
//                return badRequest("Only png images are supported");
//            }
            try {
                final String imageId = imageStore.save(item.getFile());
                downloadUrl = imageStore.downloadUrl(imageId, request());
                Logger.debug("Download url: {}", downloadUrl);

                return ok(Json.toJson(downloadUrl));
            } catch (Exception e) {
                e.printStackTrace();
                return internalServerError("Failed to store uploaded file");
            }
        }
        return ok(Json.toJson(downloadUrl));
    }

    public Result downloadImage(String id) {
        final InputStream stream = imageStore.get(id);
        if (null == stream) {
            return notFound("Image not found");
        }
        return ok(stream);
    }

    public Result deleteImage(String id) {
        if (!imageStore.delete(id)) {
            notFound("Image not found");
        }
        return ok();
    }

}

