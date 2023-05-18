package com.example.KiemTra.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    private int id;
    private String tieuDe;
    private String tacGia;
    private String theLoai;
    private Date ngayPhatHanh ;
    private int soTrang;

}
