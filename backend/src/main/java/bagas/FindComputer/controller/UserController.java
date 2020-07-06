package bagas.FindComputer.controller;

import java.util.Map;
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
    final Integer LOGGED_IN = 1;
    final Integer LOGGED_OUT = 0;

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
    public String update(@RequestParam Map<String, String> paramMap) {
        try {
            Integer userId = Integer.parseInt(paramMap.get("id"));
            User u = userRepository.findById(userId).get();
            paramMap.forEach((k, v) -> {
                if (k.equals("name")) {
                    u.setName(v);
                } else if (k.equals("email")) {
                    u.setEmail(v);
                }
            });
            userRepository.save(u);
            return "Updated";
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.OK);
        }
    }

    @PostMapping(
            path="/login",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}
    )
    public String login(@RequestParam Map<String, String> paramMap) {
        try {
            Integer userId = Integer.parseInt(paramMap.get("id"));
            String requestPassword = paramMap.get("password");
            String userPassword = userRepository.getPasswordById(userId).get();
            if (requestPassword.equals(userPassword)) {
                User u = userRepository.findById(userId).get();
                u.setIsLoggedIn(LOGGED_IN);
                userRepository.save(u);
                return "Logged in";
            } else {
                return "Password missmatch";
            }
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.OK);
        }
    }

    @PostMapping(
            path="/logout",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}
    )
    public String logout(@RequestParam Map<String, String> paramMap) {
        try {
            Integer userId = Integer.parseInt(paramMap.get("id"));
            User u = userRepository.findById(userId).get();
            u.setIsLoggedIn(LOGGED_OUT);
            userRepository.save(u);
            return "Logged out";
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.OK);
        }
    }
}