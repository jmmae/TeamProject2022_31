import java.util.ArrayList;

public class Login {
    
    public Login(){
        //unnneed currently
    }

    
    /** 
     * This Method Checks to see if supplyed username and password are valid.
     * 
     * 
     * @param username The entered username.
     * @param password The entered password.
     * @return Boolean True if Details are Valid.
     */
    public Boolean validLogon(String username, String password){
        Login_SQL login = new Login_SQL();
        ArrayList<ArrayList<Object>> results = login.checkDetails(username, password); //change password to hash(password) once hash is implenented
        if (results.get(0).isEmpty()){
            return false;
        }
        else if (results.get(0).size() == 1) {
            return true;
        }
        return false;
        
    }

    public int hash(){
        //needs implementaion
        return 0;
    }


}
