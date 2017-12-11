package com.controller;

import com.entity.Activity;
import com.entity.Files;
import com.entity.User;
import com.service.FileService;
import com.service.UserService;
import org.apache.tomcat.util.http.fileupload.FileItemFactory;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItem;
//import org.apache.commons
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;


import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import java.util.Properties;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/files")
public class FileController {
    String uploads = System.getProperty("user.dir")+"\\src\\main\\Uploads";

    @Autowired
    private FileService fileService;
    @Autowired
    private UserService userService;

    @PostMapping(path="/myfiles", consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> getAllfiles(@RequestBody String uname) {
        // This returns a JSON with the users
        JSONObject jsonObject = new JSONObject(uname);
        System.out.println(jsonObject.getString("uname"));
        List<String> results = new ArrayList<String>();

        File[] files = new File(uploads+"\\"+jsonObject.getString("uname")).listFiles();
//If this pathname does not denote a directory, then listFiles() returns null.

        for (File file : files) {
            if (file.isFile()) {
                results.add(file.getName());
            }

        }
        return results;
    }
    @PostMapping(path="/getfolders",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> getAllfolders(@RequestBody String uname) {
        // This returns a JSON with the users
        JSONObject jsonObject = new JSONObject(uname);
        System.out.println(jsonObject.getString("uname"));
        List<String> results = new ArrayList<String>();
        File[] files = new File(uploads+"\\"+jsonObject.getString("uname")).listFiles();
//If this pathname does not denote a directory, then listFiles() returns null.

        for (File file : files) {
            if (!file.isFile()) {
                results.add(file.getName());
            }
        }
        return results;
    }

    @PostMapping(path="/upload",consumes = MediaType.MULTIPART_FORM_DATA_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity Upload(@RequestParam("mypic") MultipartFile file, HttpSession session) {
        // This returns a JSON with the users
        try{
            file.transferTo(new File(uploads+File.separator+session.getAttribute("name")+File.separator+file.getOriginalFilename()));
        }
        catch (Exception e){
            System.out.println(e);
        }
        JSONObject jo = new JSONObject();
        jo.put("message","uploaded successfully");

        return new ResponseEntity("uploaded successfully",HttpStatus.CREATED);
    }
    @PostMapping(path="/getstarfiles", consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> getstarfiles(@RequestBody String uname) {
        JSONObject jsonObject = new JSONObject(uname);
        System.out.println(jsonObject.getString("uname"));
        List<String> results = new ArrayList<String>();
        Iterable<Files> files= fileService.findByEmail(jsonObject.getString("uname"));
        for (Files file : files) {
            results.add(file.getFilename());
        }
        return  results;


    }

    @PostMapping(path="/star",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> addNewUser (@RequestBody String obj) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //userService.addUser(user);
        JSONObject jsonObject = new JSONObject(obj);
        Files f = new Files();
        f.setEmail(jsonObject.getString("uname"));
        f.setFilename(jsonObject.getString("fname"));
        fileService.addFiles(f);
        return new ResponseEntity(null,HttpStatus.CREATED);
    }


    @PostMapping(path="/deletefile",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> deletefile (@RequestBody String obj) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //userService.addUser(user);
        JSONObject jsonObject = new JSONObject(obj);
        Files f = new Files();
        File file = new File(uploads+"\\"+jsonObject.getString("username")+"\\"+jsonObject.getString("filename"));

        if(file.delete())
        {
            System.out.println("File deleted successfully");
        }
        else
        {
            System.out.println("Failed to delete the file");
        }
        return new ResponseEntity(null,HttpStatus.CREATED);
    }

    @PostMapping(path="/deletestarfile",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> deletestarfile (@RequestBody String obj) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //userService.addUser(user);
        JSONObject jsonObject = new JSONObject(obj);
        Files f = new Files();
        f.setEmail(jsonObject.getString("uname"));
        f.setFilename(jsonObject.getString("fname"));
        fileService.removeFiles(f);
        return new ResponseEntity("done deltetion",HttpStatus.CREATED);
    }


    @PostMapping(path="/addNewFolder",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> addNewFolder (@RequestBody String obj) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //userService.addUser(user);
        JSONObject jsonObject = new JSONObject(obj);
        new File(uploads+"\\"+jsonObject.getString("uname")+"\\"+jsonObject.getString("fname")).mkdir();
        new File(uploads+"\\"+jsonObject.getString("ouser")+"\\"+jsonObject.getString("fname")).mkdir();
        return new ResponseEntity("done addNewFolder",HttpStatus.CREATED);
    }
    @PostMapping(path="/addNewMember",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> addNewMember (@RequestBody String obj) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //userService.addUser(user);
        JSONObject jsonObject = new JSONObject(obj);
        new File(uploads+"\\"+jsonObject.getString("ouser")+"\\"+jsonObject.getString("fname")).mkdir();
        return new ResponseEntity("done addNewMember",HttpStatus.CREATED);
    }

    @PostMapping(path="/deletegroup",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> deletegroup (@RequestBody String obj) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //userService.addUser(user);
        JSONObject jsonObject = new JSONObject(obj);
        new File(uploads+"\\"+jsonObject.getString("email")+"\\"+jsonObject.getString("foldername")).delete();
        return new ResponseEntity("done deletegroup",HttpStatus.CREATED);
    }

    @PostMapping(path="/addactivity",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> addactivity (@RequestBody String obj) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //userService.addUser(user);
        JSONObject jsonObject = new JSONObject(obj);
        Activity a = new Activity();
        a.setEmail(jsonObject.getString("uname"));
        a.setFilename(jsonObject.getString("filename"));
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println(dateFormat.format(date));
        a.setActivityType(jsonObject.getString("type")+" on "+dateFormat.format(date));
        fileService.addActivity(a);
        return new ResponseEntity(null,HttpStatus.CREATED);
    }

    @PostMapping(path="/getactivity", consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> getactivity(@RequestBody String uname) {
        // This returns a JSON with the users
        JSONObject jsonObject = new JSONObject(uname);
        System.out.println(jsonObject.getString("uname"));
        List<String> results = new ArrayList<String>();

        List<Activity> activities =fileService.getActivity(jsonObject.getString("uname"));
//If this pathname does not denote a directory, then listFiles() returns null.

        for (Activity a : activities) {
            results.add(a.getFilename()+" was "+a.getActivityType());

        }
        return results;
    }

    @PostMapping(path="/getAccountinfo", consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> getAccountinfo(@RequestBody String uname) {
        // This returns a JSON with the users
        JSONObject jsonObject = new JSONObject(uname);
        System.out.println(jsonObject.getString("uname"));
        List<String> results = new ArrayList<String>();

        List<User> activities =userService.findsomething(jsonObject.getString("uname"));
        results.add(activities.get(0).getInterests());
        results.add(activities.get(0).getUserOverview());
        results.add(activities.get(0).getEducation());
        results.add(activities.get(0).getContact());

        return results;
    }

    @PostMapping(path="/getnestedfiles", consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String getnestedfiles(@RequestBody String uname) {
        // This returns a JSON with the users
        JSONObject jsonObject = new JSONObject(uname);
        System.out.println(jsonObject.getString("uname"));
        System.out.println(jsonObject.getString("path"));
        String results="";

        File[] files = new File(uploads+"\\"+jsonObject.getString("uname")+"//"+jsonObject.getString("path")).listFiles();
//If this pathname does not denote a directory, then listFiles() returns null.

        for (File file : files) {
            if (file.isFile()) {
                results+=file.getName()+"<br>";
            }

        }
        return results;
    }

    @PostMapping(path="/getnestedfolders", consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String getnestedfolders(@RequestBody String uname) {
        // This returns a JSON with the users
        JSONObject jsonObject = new JSONObject(uname);
        System.out.println(jsonObject.getString("uname"));
        System.out.println(jsonObject.getString("path"));
        String results="";

        File[] files = new File(uploads+"\\"+jsonObject.getString("uname")+"//"+jsonObject.getString("path")).listFiles();
//If this pathname does not denote a directory, then listFiles() returns null.

        for (File file : files) {
            if (!file.isFile()) {
                results+=file.getName()+"<br>";
            }

        }
        return results;
    }

    @PostMapping(path="/sendemail", consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<?> sendemail(@RequestBody String uname) {
        // This returns a JSON with the users
        JSONObject jsonObject = new JSONObject(uname);
        System.out.println(jsonObject.getString("fname"));
        System.out.println("email:"+jsonObject.getString("email"));
        String results="";

        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class",
                "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");

        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication("imshantanu28@gmail.com","elephanta");
                    }
                });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("from@no-spam.com"));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse("divyank.shukla@sjsu.edu"));
            message.setSubject("File shared");

            // Create the message part
            BodyPart messageBodyPart = new MimeBodyPart();

            // Now set the actual message
            messageBodyPart.setText("This is message body");

            // Create a multipar message
            Multipart multipart = new MimeMultipart();

            // Set text message part
            multipart.addBodyPart(messageBodyPart);

            // Part two is attachment
            messageBodyPart = new MimeBodyPart();
            String filename = uploads+"\\"+"divyank68@yahoo.co.in"+"\\"+"w-brand.png";
            System.out.println(filename);
            DataSource source = new FileDataSource(filename);
            messageBodyPart.setDataHandler(new DataHandler(source));
            messageBodyPart.setFileName(filename);
            multipart.addBodyPart(messageBodyPart);

            // Send the complete message parts
            message.setContent(multipart);

            message.setText("Hi," +
                    "\n\n This file has been shared through awesome dropbox application!");

            Transport.send(message);

            System.out.println("Done");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        return new ResponseEntity(null,HttpStatus.CREATED);
    }
}
