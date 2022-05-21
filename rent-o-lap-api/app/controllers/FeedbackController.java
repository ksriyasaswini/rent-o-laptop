package controllers;
import java.util.*;
import Doas.FeedbackDao;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import models.Feedback;
import models.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import java.io.PrintStream;
import java.lang.String;

import javax.inject.Inject;


public class FeedbackController extends Controller{

    @Inject
    public FeedbackController(JPAApi jpaApi, FeedbackDao feedbackDao) {
        this.jpaApi = jpaApi;
        this.feedbackDao = feedbackDao;
    }
    final JPAApi jpaApi;


    @Autowired
    final FeedbackDao feedbackDao;
    @Transactional
    public Result createFeedback() {

        final JsonNode json = request().body().asJson();
        Feedback feedback = Json.fromJson(json, Feedback.class);
        feedback = feedbackDao.create(feedback);
        final JsonNode result = Json.toJson(feedback);
        return ok(result);
        //return null;
    }

    @Transactional
    public Result getFeedbacks(Integer id) {

        List<Feedback> feedbacks = feedbackDao.getFeedbacksOfDevice(id);
        final JsonNode result = Json.toJson(feedbacks);
        return ok(result);
        //return null;
    }

    @Transactional
    public Result getAveragerating(Integer id) {
        Double averageRating = feedbackDao.getAverageRating(id);
        final JsonNode result = Json.toJson(averageRating);
        return ok(result);
    }


}
