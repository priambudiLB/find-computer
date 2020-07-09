package bagas.FindComputer.controller;

import bagas.FindComputer.model.Item;
import bagas.FindComputer.model.ItemCard;
import bagas.FindComputer.model.User;
import bagas.FindComputer.repository.CategoryRepository;
import bagas.FindComputer.repository.ItemRepository;
import bagas.FindComputer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/item")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

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
            path="/delete",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}
    )
    public String removeItem(@RequestParam Map<String, String> paramMap) {
        Integer itemId = Integer.parseInt(paramMap.get("itemId"));
        try {
            Item item = itemRepository.findById(itemId).get();
            item.setStock(0);
            itemRepository.save(item);
            return "Item removed";
        } catch (
                NoSuchElementException e) {
            return "No such item";
        }
    }

    @PostMapping(path="/search")
    public @ResponseBody List<ItemCard> search(@RequestParam Map<String, String> paramMap) {
        String query = paramMap.get("search");
        try {
            return convertItemsToItemCards(itemRepository.findByName(query));
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(path="/filter")
    public @ResponseBody List<ItemCard> filterByCategory(@RequestParam Map<String, String> paramMap) {
        Integer categoryId = Integer.parseInt(paramMap.get("categoryId"));
        try {
            return convertItemsToItemCards(itemRepository.findByCategoy(categoryId));
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<ItemCard> getAllUsers() {
        return convertItemsToItemCards(itemRepository.findAll());
    }

    private List<ItemCard> convertItemsToItemCards(Iterable<Item> iterableItems) {
        List<Item> items = StreamSupport
                .stream(iterableItems.spliterator(), false)
                .collect(Collectors.toList());
        return items.stream()
                .map(this::convertItemToItemCard)
                .collect(Collectors.toList());
    }

    private ItemCard convertItemToItemCard(Item item) {
        ItemCard itemCard = new ItemCard(item);
        String category = categoryRepository
                .findById(item.getCategoryId())
                .get()
                .getName();
        String owner = userRepository
                .findById(item.getOwnerId())
                .get()
                .getName();
        itemCard.setCategory(category);
        itemCard.setOwner(owner);
        return itemCard;
    }
}