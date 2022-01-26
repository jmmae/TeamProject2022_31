import java.io.IOException;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.stage.Stage;

public class Customer_menu {

  ObservableList<String> tableNumbers = FXCollections.observableArrayList("Table 1", "Table 2", "Table 3", "Table 4",
      "Table 5", "Table 6", "Table 7", "Table 8", "Table 9", "Table 10");

  @FXML
  private Button Menu;

  @FXML
  private Button callWaiter;

  @FXML
  private Button makeOrder;

  @FXML
  private Button prevPage;

  @FXML
  private ComboBox tableNumber;

  @FXML
  private Button viewOrder;

  @FXML
  void waiter(ActionEvent event) {

  }

  @FXML
  void makingOrder(ActionEvent event) {

  }

  @FXML
  void previousPage() throws IOException {
    Stage primaryStage = new Stage();
    Parent root = FXMLLoader.load(getClass().getResource("/Main_Menu.fxml"));
    Scene scene = new Scene(root, 1200, 900);
    primaryStage.setScene(scene);
    primaryStage.show();
  }

  @FXML
  public void viewMenu() throws IOException {
    Stage primaryStage = new Stage();
    Parent root = FXMLLoader.load(getClass().getResource("/Customer_menu.fxml"));
    Scene scene = new Scene(root, 1200, 900);
    primaryStage.setScene(scene);
    primaryStage.show();
  }

  @FXML
  void viewOrder(ActionEvent event) {

  }

  @FXML
  private void initialize() {

    tableNumber.setValue("Table Number");
    tableNumber.setItems(tableNumbers);
    ;
  }

}
