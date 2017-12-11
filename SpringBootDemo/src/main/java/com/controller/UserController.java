package com.controller;

import com.entity.User;
import com.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.html.HTMLParagraphElement;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.security.MessageDigest;
import java.util.List;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/users") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired
    private UserService userService;
    String uploads = System.getProperty("user.dir")+"\\src\\main\\Uploads";

    @PostMapping(path="/add",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> addNewUser (@RequestBody User user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        userService.addUser(user);
        System.out.println("Saved");
        return new ResponseEntity(null,HttpStatus.CREATED);
    }

    @GetMapping(path="/all",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<?> getAllUsers() {
        // This returns a JSON with the users
        //return userService.getAllUsers();
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping(path="/check",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<User> Check() {
        // This returns a JSON with the users
        return userService.findsomething("Bhavan");
    }

    @PostMapping(path="/dologin",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user, HttpSession session)
    {
        System.out.println(user);
        JSONObject jsonObject = new JSONObject(user);
        System.out.println(user);
        session.setAttribute("name",jsonObject.getString("email"));
        List<User> userResult=userService.login(jsonObject.getString("email"));
        System.out.println(userResult.size());
        if(userResult.size()>0 && userResult.get(0).getPassword().equals(generateHash(jsonObject.getString("password")))){
            new File(uploads+"\\"+jsonObject.getString("email")).mkdir();
            return new ResponseEntity(HttpStatus.CREATED);
        }
        else
        {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        //return new ResponseEntity(userService.login(jsonObject.getString("email"),jsonObject.getString("password")),HttpStatus.OK);
    }

    @PostMapping(path="/signup",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signup(@RequestBody String user) {
        JSONObject jsonObject = new JSONObject(user);
        System.out.println(jsonObject);
        System.out.println(jsonObject.getString("email"));
        String saltedPassword = jsonObject.getString("password");
        String hashedPassword = generateHash(saltedPassword);
        User u = new User();
        u.setEmail(jsonObject.getString("email"));
        u.setPassword(hashedPassword);
        u.setFirstName(jsonObject.getString("firstname"));
        u.setLastName(jsonObject.getString("lastname"));
        u.setEducation(jsonObject.getString("education"));
        u.setContact(jsonObject.getString("contact"));
        u.setInterests(jsonObject.getString("interests"));
        u.setUserOverview(jsonObject.getString("useroverview"));
        userService.addUser(u);

        return new ResponseEntity("signup successful",HttpStatus.CREATED);
    }

    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println(session.getAttribute("name"));
        session.invalidate();
        return  new ResponseEntity(HttpStatus.OK);
    }

    public static String generateHash(String input) {
        StringBuilder hash = new StringBuilder();

        try {
            MessageDigest sha = MessageDigest.getInstance("SHA-1");
            byte[] hashedBytes = sha.digest(input.getBytes());
            char[] digits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                    'a', 'b', 'c', 'd', 'e', 'f' };
            for (int idx = 0; idx < hashedBytes.length;idx++) {
                byte b = hashedBytes[idx];
                hash.append(digits[(b & 0xf0) >> 4]);
                hash.append(digits[b & 0x0f]);
            }
        } catch (Exception e) {
            // handle error here.
        }

        return hash.toString();
    }
}