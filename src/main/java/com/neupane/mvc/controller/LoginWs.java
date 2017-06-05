package com.neupane.mvc.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.neupane.mvc.dbconnection.MasterDbConnection;

/*
 * @Author pralad neupane
 * 
 */
@Controller
@RequestMapping("/api/auth")
public class LoginWs {

	private static String dbName = null;

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/login")
	@ResponseBody
	public ResponseEntity<String> openMultipleConnection(@RequestParam("myValue") String myValue) {

		JSONObject jsonObject = new JSONObject(myValue);
		String dbCode = jsonObject.get("code").toString();

		try (Connection con = MasterDbConnection.getConnection()) {

			PreparedStatement stmt = con.prepareStatement("SELECT * from apex where dbcode = ?");
			stmt.setString(1, dbCode);
			ResultSet rs = stmt.executeQuery();

			while (rs.next()) {
				dbName = rs.getString("dbname");
			}
			getChieldConnection();

		} catch (SQLException e) {
			e.printStackTrace();
		}
		System.out.println("ok.......................");
		return ResponseEntity.ok("name");
	}

	public Connection getChieldConnection() {
		Connection con = null;
		try {
			Class.forName("org.postgresql.Driver");
			con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/" + dbName, "postgres", "logic");
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return con;
	}

}
