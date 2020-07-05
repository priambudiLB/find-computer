package bagas.FindComputer.repository;

import bagas.FindComputer.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

}
