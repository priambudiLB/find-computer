package bagas.FindComputer.controller;

import bagas.FindComputer.model.Item;
import bagas.FindComputer.model.User;
import bagas.FindComputer.repository.ItemRepository;
import bagas.FindComputer.repository.UserRepository;
import com.sipios.springsearch.anotation.SearchSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @PostMapping(
            path="/add",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}
            )
    public String addItem(Item i) throws Exception {
        try {
            itemRepository.save(i);
            return "Item saved";
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.OK);
        }
    }

    @PostMapping(
            path="/remove",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}
    )
    public String removeItem(Integer itemId, Integer removerId) throws Exception {
        try {
            if (itemRepository.findById(itemId).get().getOwnerId().equals(removerId)) {
                itemRepository.deleteById(itemId);
                return "Item removed";
            } else {
                return "Cannot remove other user's item";
            }

        } catch (
                NoSuchElementException e) {
            return "No such item";
        }
    }

    @PostMapping(
            path="/search",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}
    )
    public Iterable<Item> searchItem(@SearchSpec Specification<Item> specs) throws Exception {
        return itemRepository.findAll(Specification.where(specs));
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Item> getAllUsers() {
        return itemRepository.findAll();
    }
}