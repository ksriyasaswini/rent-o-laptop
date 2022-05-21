package services;

import controllers.routes;
import play.Logger;
import play.mvc.Http;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

public class LocalFileImageStore implements ImageStore {

    private static final Path IMAGES_ROOT = Paths.get("/tmp/play/images");

    public LocalFileImageStore() {

        File rootDir = IMAGES_ROOT.toFile();
        if (!rootDir.exists() && rootDir.mkdirs()) {
            Logger.error("Failed to create image upload directory");
        }
    }

    public String save(File file) {

        final Path source = file.toPath();
        final String imageId = createImageId();
        final Path target = createImagePath(imageId + ".png");

        Logger.debug("source: {} target: {}", source, target);

        try {
            Files.move(source, target, REPLACE_EXISTING);
            Logger.debug("Upload file: {}, to path: {}", source, target);
            return imageId;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

    }

    public InputStream get(String id) {

        final File file = createImagePath(id + ".png").toFile();
        try {
            return new FileInputStream(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean delete(String id) {

        final Path path = createImagePath(id + ".png");
        if (!path.toFile().isFile()) {
            return false;
        }

        try {
            Files.deleteIfExists(path);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public URL downloadUrl(String id, Http.Request request) {
        try {
            final String downloadUrl = routes.ImageController.downloadImage(id).absoluteURL(request);
            return new URL(downloadUrl);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static Path createImagePath(String imageId) {
        return IMAGES_ROOT.resolve(imageId);
    }

    private static String createImageId() {
        final UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }

}