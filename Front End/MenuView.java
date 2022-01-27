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
        //String database = "localhost"; //for tunnelling (reference database lab)
		
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
		try{
			Statement st = connection.createStatement();
			st.execute("DROP TABLE IF EXISTS " + table);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void createTable(Connection connection, String tableDescription) {
		try{
			Statement st = connection.createStatement();
			st.execute("CREATE TABLE " + tableDescription);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	//Insert into table method


	//Execute Query method


	//Query for All menu and specific categories

	
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
