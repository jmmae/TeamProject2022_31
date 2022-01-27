import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

public class MenuView {
	
	public static void main(String[] argv) throws SQLException {

		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter Username: ");
		String user = scanner.nextLine();
		System.out.println("Enter Password: ");
		String password = scanner.nextLine();
		scanner.close();
		
		//Have not got our own database so use tunnelling or no machine to test on teaching server
		//String database = "teachdb.cs.rhul.ac.uk"; // for nomachine
        	String database = "localhost"; //for tunnelling (reference database lab)
		
		Connection connection = connectToDatabase(user, password, database);
		if (connection != null) {
			System.out.println("SUCCESS: You made it!"
					+ "\n\t You can now take control of your database!\n");
		} else {
			System.out.println("ERROR: \tFailed to make connection!");
			System.exit(1);
		}
		
	    	dropTable(connection, "menu");
	    
		createTable(connection, "menu ("
		        + "dish_name varchar(3) primary key,"
		        + "dish_type varchar(255),"
		        + "dish_diet char(4),"
                + "available boolean)");
		
	}

	public static void dropTable(Connection connection, String table) {
		String query = "DROP TABLE IF EXISTS " + table + " cascade";
		try {
			Statement st = connection.createStatement();
			st.execute(query);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void createTable(Connection connection, String tableDescription) {
		String query = "CREATE TABLE " + tableDescription;
		String findTable = tableDescription.substring(0, tableDescription.indexOf("(")).trim(); //trim removes white spaces
		try {
			dropTable(connection, findTable); //drops table before creation if it exists (uses findTable)
			Statement st = connection.createStatement();
			st.execute(query);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void insertIntoTable(Connection connection, String table, String values) {
		try{
			Statement st = connection.createStatement();
			st.executeUpdate("INSERT INTO " + table + " VALUES (" + values + ");");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static ResultSet executeQuery(Connection connection, String query) {
		try {
			Statement st = connection.createStatement();
			ResultSet rs = st.executeQuery(query);
			return rs;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	//Query for All menu and specific categories

    	public static void queryAll(Connection connection) throws SQLException {
		System.out.println("############### All Menu Items ###############");
		String query = "SELECT * FROM menu";
		ResultSet rs = executeQuery(connection, query);
		try {
			while (rs.next()) {
				System.out.println(rs.getString(1) + " " + rs.getString(2) + " " + rs.getString(3) + " " rs.getString(4));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		rs.close();
	}
	
	public static Connection connectToDatabase(String user, String password, String database) {
		System.out.println("------ Testing PostgreSQL JDBC Connection ------");
		Connection connection = null;
		try {
			String protocol = "jdbc:postgresql://";
			String dbName = "/CS2810/";
			String fullURL = protocol + database + dbName + user;
			connection = DriverManager.getConnection(fullURL, user, password);
		} catch (SQLException e) {
			String errorMsg = e.getMessage();
			if (errorMsg.contains("authentication failed")) {
				System.out.println("ERROR: \tDatabase password is incorrect");
			} else {
				System.out.println("Connection failed! Check output console.");
				e.printStackTrace();
			}
		}
		return connection;
	}
}
