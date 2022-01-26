import java.io.IOException;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.stage.Stage;

public class Main_Menu {

    @FXML
    private Button Customer_menu;

    @FXML
    private Button Staff_menu;

    @FXML
    void Staff_Menu(ActionEvent event) {

    }

    @FXML
    void Customer_Menu() throws IOException {
      Stage primaryStage = new Stage();
      Parent root = FXMLLoader.load(getClass().getResource("/Customer_menu.fxml"));
      Scene scene = new Scene(root, 1200, 900);
      primaryStage.setScene(scene);
      primaryStage.show();
    }

}
