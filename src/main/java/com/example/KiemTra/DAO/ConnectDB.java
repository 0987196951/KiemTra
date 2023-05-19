package com.example.KiemTra.DAO;

import java.sql.*;
public class ConnectDB {
    protected Connection connection;
    public ConnectDB()
    {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/kiemtra";
            String username = "root";
            String password = "Tien170421";
            connection = DriverManager.getConnection(url, username, password);
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println(e);
        }
    }
}
