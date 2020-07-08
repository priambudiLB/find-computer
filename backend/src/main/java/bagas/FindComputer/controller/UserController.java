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

    @PostMapping(path="/register")
    public User register(@RequestParam Map<String, String> paramMap) {
        try {
            String userName = paramMap.get("name");
            String userEmail = paramMap.get("email");
            String userPassword = paramMap.get("password");
            User u = new User();
            u.setName(userName);
            u.setEmail(userEmail);
            u.setPassword(userPassword);
            u.setIsLoggedIn(1);
            userRepository.save(u);
            return u;
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.OK);
        }
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping(path="/detail",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}
    )
    public User findById(@RequestParam Map<String, String> paramMap) {
        Integer userId = Integer.parseInt(paramMap.get("id"));
        try {
            return userRepository.findById(userId).get();
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "ID " + userId.toString() + " Tidak Ditemukan");
        }
    }

    @PostMapping(
            path="/update",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}
            )
    public User update(@RequestParam Map<String, String> paramMap) {
        try {
            String userName = paramMap.get("name");
            String userEmail = paramMap.get("email");
            User u = userRepository.findByEmail(userEmail).get();
            u.setName(userName);
            paramMap.forEach((k, v) -> {
                if (k.equals("name")) {
                    u.setName(v);
                }
            });
            userRepository.save(u);
            return u;
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
    public User login(@RequestParam Map<String, String> paramMap) {
        try {
            String userEmail = paramMap.get("email");
            String requestPassword = paramMap.get("password");
            String userPassword = userRepository.getPasswordByEmail(userEmail).get();
            if (requestPassword.equals(userPassword)) {
                User u = userRepository.findByEmail(userEmail).get();
                u.setIsLoggedIn(LOGGED_IN);
                userRepository.save(u);
                return u;
            } else {
                return new User();
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
            String userEmail = paramMap.get("email");
            User u = userRepository.findByEmail(userEmail).get();
            u.setIsLoggedIn(LOGGED_OUT);
            userRepository.save(u);
            return "Logged out !!!!!";
        } catch (
                NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.OK);
        }
    }
}