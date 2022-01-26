import java.sql.ResultSet;

public class DatabaseConnection {

    public DatabaseConnection(){

    }

    
    /** 
     * This method sends a query to the database and returns what is returned.
     * 
     * @param query A String SQL Statement.
     * @return ResultSet An oject that contains returned data
     */
    public ResultSet query(String query){
        //needs implementaion
        ResultSet rs = query(query);
        return rs;
    }
     

}
