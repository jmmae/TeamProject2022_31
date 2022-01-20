import java.io.IOException;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

public class Customer_menu {

  ObservableList<String> tableNumbers = FXCollections.observableArrayList("Table 1", "Table 2", "Table 3", "Table 4",
      "Table 5", "Table 6", "Table 7", "Table 8", "Table 9", "Table 10");

  @FXML
  private Button calculate;

  @FXML
  private TextField getExpression;

  @FXML
  private ComboBox tableNumber;

  @FXML
  public void onClick() throws IOException {
    Stage primaryStage = new Stage();
    Parent root = FXMLLoader.load(getClass().getResource("Customer_menu.fxml"));
    Scene scene = new Scene(root, 1200, 900);
    primaryStage.setScene(scene);
    primaryStage.show();
  }

  @FXML
  private void initialize() {

    tableNumber.setValue("Table Number");
    tableNumber.setItems(tableNumbers);
    ;
  }

}
