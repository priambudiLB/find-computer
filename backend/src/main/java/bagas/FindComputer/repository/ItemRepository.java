package bagas.FindComputer.repository;

import bagas.FindComputer.model.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Integer> {

}
