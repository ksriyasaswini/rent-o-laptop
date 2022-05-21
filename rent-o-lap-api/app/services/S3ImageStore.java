package services;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import play.Configuration;
import play.mvc.Http;

import javax.inject.Inject;
import java.io.File;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.UUID;
import com.typesafe.config.Config;

public class S3ImageStore implements ImageStore {

//    private static final String AWS_S3_BUCKET = "imagestore-hackathon";
//    private static final String AWS_ACCESS_KEY = "AKIASQBF6AAPZTV4J2HE";
//    private static final String AWS_SECRET_KEY = "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";

    private final String bucket;

    private final AmazonS3 s3Client;

    @Inject
    public S3ImageStore(Config config) {

        // You can create your own Amazon S3 bucket
        // There is a free tier up to a limit (https://aws.amazon.com/s3/pricing/)
        // Key and secret should never be stored in the source code (some one can get it from Github)
        // Instead export them as environment variable in your Terminal
        // $ export AWS_ACCESS_KEY=<Your AWS Access Key>
        // $ export AWS_SECRET_KEY=<Your AWS Secret Key>
        // When you compile your code the application.config will be updated with these values
//        String accessKey = config.getString(AWS_ACCESS_KEY);
//        String secretKey = config.getString(AWS_SECRET_KEY);
        String accessKey = "AKIASQBF6AAPZTV4J2HE";
        String secretKey = "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";
        BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

        s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.AP_SOUTH_1)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();

        //bucket = config.getString(AWS_S3_BUCKET);
        bucket = "imagestore-hackathon";
    }

    @Override
    public String save(File file) {

        final String key = getKey();

        PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, key, file);
        putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead);
        s3Client.putObject(putObjectRequest);

        return key;
    }

    @Override
    public InputStream get(String id) {
        S3Object object = s3Client.getObject(bucket, id);
        S3ObjectInputStream objectContent = object.getObjectContent();
        return objectContent;
    }

    @Override
    public boolean delete(String id) {
        DeleteObjectsRequest dor = new DeleteObjectsRequest(bucket)
                .withKeys(id);
        s3Client.deleteObjects(dor);
        return true;
    }

    @Override
    public URL downloadUrl(String id, Http.Request request) {

        try {
            return new URL("https://" + bucket + ".s3.amazonaws.com/" + id);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static String getKey() {
        return UUID.randomUUID().toString() + ".png";
    }

}