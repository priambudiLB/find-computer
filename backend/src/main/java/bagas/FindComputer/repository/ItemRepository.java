package bagas.FindComputer.repository;

import bagas.FindComputer.model.Item;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Integer>, JpaSpecificationExecutor<Item> {

}
