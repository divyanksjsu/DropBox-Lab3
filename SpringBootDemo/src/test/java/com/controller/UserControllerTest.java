package com.controller;


import com.repository.UserRepository;
import com.service.UserService;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController= new UserController();

    private MockMvc mockMvc;

    @Before
    public void setup() {
        //MockitoAnnotations.initMocks(this);

        //userService=new UserService();
        this.mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }
    @Test
    public void shouldLogin() throws Exception {

        

        this.mockMvc.perform(post("/users/dologin")

                .content("{'email':'divyank68@yahoo.co.in','password':'spring'}")
                .contentType("application/json"))
                .andExpect(status().isCreated());
    }
    @Test
    public void shouldNotLoginwithWrongcredentials() throws Exception {

        JSONObject jsonObj = new JSONObject("{\"password\":\"admin\",\"email\":\"admin\"}");

        this.mockMvc.perform(post("/users/dologin")

                .content("{'email':'wrongemail','password':'wrongpassword'}")
                .contentType("application/json"))
                .andExpect(status().isForbidden());
    }

    @Test
    public void checkServerConnection() throws Exception {

        this.mockMvc.perform(get("/users/all"))
              .andExpect(status().isCreated());
    }
    @Test
    public void getUserAccountInfo() throws Exception {

        

        this.mockMvc.perform(post("/files/getAccountinfo")

                .content("{'uname':'divyank68@yahoo.co.in'")
                .contentType("application/json"))
                .andExpect(status().isOk());
    }
    @Test
    public void LogoutAndDestroyTheSession() throws Exception {

        

        this.mockMvc.perform(post("/users/logout")


                .contentType("application/json"))
                .andExpect(status().isOk());
    }
    @Test
    public void InsertStarFile() throws Exception {

        

        this.mockMvc.perform(post("/files/star")

                .content("{'email':'divyank68@yahoo.co.in','password':'adrian.jpg'}")
                .contentType("application/json"))
                .andExpect(status().isCreated());
    }

    @Test
    public void DeleteGroup() throws Exception {

        

        this.mockMvc.perform(post("/files/deletegroup")

                .content("{'email':'divyank68@yahoo.co.in','password':'check'}")
                .contentType("application/json"))
                .andExpect(status().isOk());
    }
    @Test
    public void ShareSendMail() throws Exception {

        

        this.mockMvc.perform(post("/users/sendemail")

                .content("{'email':'divyank68@yahoo.co.in','fname':'adrian.jpg'}")
                .contentType("application/json"))
                .andExpect(status().isCreated());
    }
    @Test
    public void GetMyFolders() throws Exception {

        

        this.mockMvc.perform(post("/users/getfolders")

                .content("{'uname':'divyank68@yahoo.co.in'}")
                .contentType("application/json"))
                .andExpect(status().isOk());
    }
    @Test
    public void GetMyfiles() throws Exception {



        this.mockMvc.perform(post("/users/myfiles")

                .content("{'uname:'divyank68@yahoo.co.in'}")
                .contentType("application/json"))
                .andExpect(status().isOk());
    }

}
