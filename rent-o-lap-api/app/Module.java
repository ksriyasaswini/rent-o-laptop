import com.google.inject.AbstractModule;
import java.time.Clock;

import services.ApplicationTimer;
import services.AtomicCounter;
import services.Counter;
import Doas.*;
import services.*;

/**
 * This class is a Guice module that tells Guice how to bind several
 * different types. This Guice module is created when the Play
 * application starts.
 *
 * Play will automatically use any class called `Module` that is in
 * the root package. You can create modules in other locations by
 * adding `play.modules.enabled` settings to the `application.conf`
 * configuration file.
 */
public class Module extends AbstractModule {

    @Override
    public void configure() {

        bind(UserDao.class).to(UserDaoImpl.class);

        bind(AuthenticationDao.class).to(AuthenticationDaoImpl.class);

        bind(DevicesDao.class).to(DeviceDaoImpl.class);

        bind(ImageDao.class).to(ImageDaoImpl.class);

        bind(ImagesStore.class).to(ImagesStoreImpl.class);
        bind(ImageStore.class).to(S3ImageStore.class);

        bind(FeedbackDao.class).to(FeedbackDaoImpl.class);

        bind(BookingDao.class).to(BookingDaoImpl.class);

        //bind(BookDao.class).to(FakeBookDao.class);
        // Use the system clock as the default implementation of Clock
        bind(Clock.class).toInstance(Clock.systemDefaultZone());
        // Ask Guice to create an instance of ApplicationTimer when the
        // application starts.
        bind(ApplicationTimer.class).asEagerSingleton();
        // Set AtomicCounter as the implementation for Counter.
        bind(Counter.class).to(AtomicCounter.class);
    }

}
