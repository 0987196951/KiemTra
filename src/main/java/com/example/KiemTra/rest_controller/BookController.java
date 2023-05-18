package com.example.KiemTra.rest_controller;

import com.example.KiemTra.DAO.ConnectDB;
import com.example.KiemTra.model.Book;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BookController extends ConnectDB {

//    private boolean exitsStudent(int id) {
//        PreparedStatement preparedStatement = null;
//        ResultSet resultSet = null;
//        try {
//            preparedStatement = connection
//                    .prepareStatement("select * from student where id = ?");
//            preparedStatement.setInt(1, id);
//            resultSet = preparedStatement.executeQuery();
//            if (resultSet.next()) {
//                return true;
//            }
//        } catch (Exception e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
//        return false;
//    }


    @GetMapping("/books")
    public List<Book> getBooks() {
        Statement statement = null;
        ResultSet resultSet = null;
        List<Book> results = new ArrayList<>();
        try {
            statement = connection.createStatement();
            resultSet = statement.executeQuery("select * from book");
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String tieuDe = resultSet.getString("tieuDe");
                String tacGia =  resultSet.getString("tacGia");
                String theLoai = resultSet.getString("theLoai");
                Date ngayPhatHanh = resultSet.getDate("ngayPhatHanh");
                int soTrang = resultSet.getInt("soTrang");
                results.add(new Book(id, tieuDe, tacGia, theLoai, ngayPhatHanh, soTrang));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return results;

    }

    @GetMapping("/book/{id}")
    public Book getBook(@PathVariable int id) {
        Book book = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            preparedStatement = connection.prepareStatement("select * from book where id = ?");
            preparedStatement.setInt(1, id);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String tieuDe = resultSet.getString("tieuDe");
                String tacGia =  resultSet.getString("tacGia");
                String theLoai = resultSet.getString("theLoai");
                Date ngayPhatHanh = resultSet.getDate("ngayPhatHanh");
                int soTrang = resultSet.getInt("soTrang");
                book = new Book(id, tieuDe, tacGia, theLoai, ngayPhatHanh, soTrang);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return book;
    }

    @PostMapping("/addBook")
    public boolean addBook(@RequestBody Book newBook) {
        PreparedStatement ps = null;
        int result = 0;
        try {
            ps = connection.prepareStatement("INSERT INTO book VALUES (?, ?, ?, ?, ?)");
            ps.setString(1, newBook.getTieuDe());
            ps.setString(2, newBook.getTacGia());
            ps.setString(3, newBook.getTheLoai());
            ps.setDate(4, newBook.getNgayPhatHanh());
            ps.setInt(5, newBook.getSoTrang());
            result = ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @PostMapping("/editBook")
    public boolean editBook(@RequestBody Book newBook) {
        PreparedStatement ps = null;
        int result = 0;
        try {
            ps = connection.prepareStatement("UPDATE book SET tieuDe = ?," +
                    " tacGia = ?, theLoai = ?, ngayPhatHanh = ?, soTrang = ?");
            ps.setString(1, newBook.getTieuDe());
            ps.setString(2, newBook.getTacGia());
            ps.setString(3, newBook.getTheLoai());
            ps.setDate(4, newBook.getNgayPhatHanh());
            ps.setInt(5, newBook.getSoTrang());
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
