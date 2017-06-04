package com.neupane.mvc.dbconnection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class MasterDbConnection {

	public static Connection getConnection() {
		Properties props = new Properties();
		Connection con = null;
		try {
			// load the Driver Class
			Class.forName("org.postgresql.Driver");
			// create the connection now
			con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/master-db", "postgres", "logic");
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return con;
	}

}
