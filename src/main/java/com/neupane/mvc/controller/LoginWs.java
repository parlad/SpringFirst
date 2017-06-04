package com.neupane.mvc.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.codehaus.jettison.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.neupane.mvc.dbconnection.MasterDbConnection;
import com.neupane.mvc.entity.MasterDb;

/*
 * @Author pralad neupane
 * 
 */

@Controller
@RequestMapping("/api/auth")
public class LoginWs {

	private static String dbName = null;

	@RequestMapping(value = "/login")
	public String openMultipleConnection(@RequestParam MasterDb masterDb) {

		System.out.println(masterDb.getDatabaseCode());

		try (Connection con = MasterDbConnection.getConnection()) {
			JSONObject jsonObject = new JSONObject();
			PreparedStatement stmt = con.prepareStatement("SELECT * from apex where dbcode = ?");
			stmt.setString(1, "6000");
			ResultSet rs = stmt.executeQuery();

			while (rs.next()) {
				dbName = rs.getString("dbname");
			}
			getChieldConnection();

		} catch (SQLException e) {
			e.printStackTrace();
		}
		// return new ResponseEntity<String>("message", HttpStatus.OK);
		return null;

	}

	public Connection getChieldConnection() {
		System.out.println("chield db name " + dbName);
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
