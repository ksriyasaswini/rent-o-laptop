package Doas;
import models.*;

import java.util.List;

public interface FeedbackDao extends CrudDao<Feedback, Integer>{
    List<Feedback> getFeedbacksOfDevice(Integer id);
    Double getAverageRating(Integer id);
}
