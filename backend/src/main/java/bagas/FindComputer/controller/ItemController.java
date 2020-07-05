package bagas.FindComputer.controller;

import bagas.FindComputer.model.Item;
import bagas.FindComputer.model.User;
import bagas.FindComputer.repository.ItemRepository;
import bagas.FindComputer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
            return "Item Saved";
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.OK);
        }
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Item> getAllUsers() {
        return itemRepository.findAll();
    }
}