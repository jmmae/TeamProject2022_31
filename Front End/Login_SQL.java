import java.sql.*;
import java.util.ArrayList;

public class Login_SQL {
    
    public Login_SQL(){
        //Unneeded
    }

    
    /** 
     * This Method Converts the inputed username and password and converts
     * them into a Valid SQL statment then converts the results into a Dual Arraylist.
     * 
     * @param username the username to find.
     * @param passwordHash a hash of the password to find.
     * @return ArrayList<ArrayList<Object>>
     */
    public ArrayList<ArrayList<Object>> checkDetails(String username,String passwordHash){
        
        String sql =  "SELECT Password FROM Login WHERE username = '" + username + "' AND password = '" + passwordHash + "';";
        
        DatabaseConnection db = new DatabaseConnection();
        ResultSet rs = db.query(sql);
        
        try {
        
            ResultSetMetaData rsmd = rs.getMetaData();
            int column = rsmd.getColumnCount();
            ArrayList<ArrayList<Object>> array = new ArrayList<>(column);
            for(int i = 0; i < column; i++){
                array.add(new ArrayList<>());
            }


            while(rs.next()) {
              
              for(int i = 1; i <= column; i++) {
                array.get(i).add(rs.getObject(i));
              }
              
            }
            return array;
            

          } catch (SQLException e) {
            e.printStackTrace();
          }
        return new ArrayList<>();
    } 
}
