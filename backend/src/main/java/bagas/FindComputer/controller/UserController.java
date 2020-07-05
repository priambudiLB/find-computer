package bagas.FindComputer.controller;

import java.util.NoSuchElementException;
import java.util.Optional;

import bagas.FindComputer.model.User;
import bagas.FindComputer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/add")
    public String addUser(@RequestParam String name, @RequestParam String username) {
        try {
            User u = new User();
            u.setName(name);
            u.setEmail(username);
            userRepository.save(u);
            return "Saved";
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.OK);
        }
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping(path="/detail/{id}")
    public Optional<User> findById(@PathVariable("id") Integer id) {
        try {
            return userRepository.findById(id);
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "ID " + id + " Tidak Ditemukan");
        }
    }

    @PostMapping(
            path="/update",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}
            )
    public String update(User i) {
        try {
            userRepository.save(i);
            return "Updated";
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.OK);
        }
    }
}