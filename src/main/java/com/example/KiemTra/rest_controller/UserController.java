package com.example.KiemTra.rest_controller;

import com.example.KiemTra.DAO.ConnectDB;
import com.example.KiemTra.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

@RestController
public class UserController extends ConnectDB {
    @PostMapping("user")
    public Boolean isUser(@RequestBody User user) {
        User userResponse = null;
        PreparedStatement ps = null;
        try {
            ps = connection.prepareStatement("SELECT * FROM user where username = ? AND password = ? LIMIT 1");
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            ResultSet resultSet = ps.executeQuery();
            while (resultSet.next()){
                userResponse = new User(resultSet.getString("username"), resultSet.getString("password"));
            }
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        if (userResponse == null) {
            return false;
        }
        return true;
    }
}
