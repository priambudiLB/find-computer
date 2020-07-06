package bagas.FindComputer.repository;

import bagas.FindComputer.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    @Query("select u from User u where u.email = :email")
    Optional<User> findByEmail(String email);

    @Query("update User u set u.isLoggedIn = :isLoggedIn where u.id = :id")
    void setIsLoggedIn(Integer isLoggedIn, Integer id);

    @Query("select u.password from User u where u.id = :id")
    Optional<String> getPasswordById(Integer id);
}
