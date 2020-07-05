//package bagas.FindComputer.controller;
//
//import java.util.NoSuchElementException;
//import bagas.FindComputer.model.User;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.server.ResponseStatusException;
//
//@RestController
//@RequestMapping("/api/user")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
//public class UserController {
//
//
//    @GetMapping(value = "/{id}")
//    public User user(@PathVariable("id") Integer id) {
//        try {
////            User u = userService.findById(id);
//            User u2 = new User(id, "test", "cek");
//            return u2;
//        } catch (
//                NoSuchElementException e) {
//            throw new ResponseStatusException(
//                    HttpStatus.NOT_FOUND, "ID " + id + " Tidak Ditemukan");
//        }
//    }
//}