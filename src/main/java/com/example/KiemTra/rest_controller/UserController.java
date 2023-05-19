package com.example.KiemTra.rest_controller;

import com.example.KiemTra.DAO.ConnectDB;
import com.example.KiemTra.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.ResultSet;


@RestController
@RequestMapping("user")
public class UserController extends ConnectDB {
    @PostMapping("/checkUser")
    @CrossOrigin(origins = "*",
            allowedHeaders = "Authorization, Content-type, Access-Control-Allow-Methods, Accept, Accept-Language",
            methods = {RequestMethod.POST})
    public ResponseEntity<User> isUser(@ModelAttribute User user) {
        User userResponse = null;
        PreparedStatement ps = null;
        try {
            ps = connection.prepareStatement("SELECT * FROM user where username = ? AND password = ?" +
                    " LIMIT 1");
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            ResultSet resultSet = ps.executeQuery();
            while (resultSet.next()){
                userResponse = new User(resultSet.getString("username"),
                        resultSet.getString("password"),
                        resultSet.getString("email"),
                        resultSet.getString("sdt"));
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("/addUser")
    public Boolean addUser(@ModelAttribute User user ) {
        PreparedStatement ps = null;
        try {
            ps = connection.prepareStatement("INSERT INTO user VALUES (?, ?, ?, ?)");
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            ps.setString(3, user.getEmail());
            ps.setString(4, user.getSdt());
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
