package Doas;
import java.util.*;
import models.DeviceDetails;
import models.Feedback;
import models.UserDetails;
import play.db.jpa.JPAApi;
import javax.inject.Inject;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;
import java. util. Collection;
public class FeedbackDaoImpl implements FeedbackDao {
    final JPAApi jpaApi;

    @Inject
    public FeedbackDaoImpl(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }

    public Feedback create (Feedback feedback) {

        if (null == feedback) {
            throw new IllegalArgumentException("Valid Feedback must be provided");
        }

        jpaApi.em().persist(feedback);
        return feedback;

    }

    @Override
    public Optional<Feedback> read(Integer id) {
        return Optional.empty();
    }

    @Override
    public Feedback update(Feedback feedback) {
        return null;
    }

    @Override
    public Feedback delete(Integer id) {
        return null;
    }

    @Override
    public Collection<Feedback> all() {
        return null;
    }

    public List<Feedback> getFeedbacksOfDevice(Integer id){
        TypedQuery<Feedback> query1 = jpaApi.em().createQuery("SELECT f from DeviceDetails d, Feedback f where d.id = f.deviceID AND d.id = '"+id+"'", Feedback.class);
        List<Feedback> feedbacks = query1.getResultList();

        if(null == feedbacks) {
            return null;
        }
        return feedbacks;
    }
    public Double getAverageRating(Integer id){
        TypedQuery<Double> query1 = jpaApi.em().createQuery("SELECT AVG(f.deviceRating) from DeviceDetails d, Feedback f where d.id = f.deviceID AND d.id = '"+id+"'", Double.class);
       Double averageRating = query1.getSingleResult();

        if(null == averageRating) {
            return null;
        }
        return averageRating;
    }
}
