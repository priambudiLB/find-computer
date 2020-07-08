package bagas.FindComputer.repository;

import bagas.FindComputer.model.Item;
import bagas.FindComputer.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ItemRepository extends CrudRepository<Item, Integer> {
    @Query("select i from Item i where i.name = :name")
    List<Item> findByName(String name);

    @Query("select i from Item i where i.categoryId = :id")
    List<Item> findByCategoy(Integer id);
}
