package lorenzopellegrini.gestionebackoffice;

import lorenzopellegrini.gestionebackoffice.config.AdminProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AdminProperties.class)
public class GestioneBackOfficeApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestioneBackOfficeApplication.class, args);
    }

}