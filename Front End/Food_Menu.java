import java.io.IOException;
import java.util.Collection;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.stage.Stage;

public class Food_Menu {

    @FXML
    private Button Prev_page;

    @FXML
    private Button Show_menu;

    @FXML
    private TableView<Food> foodTable;

    @FXML
    private TableColumn<Food, String> item;

    @FXML
    private TableColumn<Food, String> description;

    @FXML
    private TableColumn<Food, Integer> price;

    @FXML
    void Show_Menu(ActionEvent event) {
        foodTable.setItems(getFood());
    }

    @FXML
    void previousPage() throws IOException {
        Stage primaryStage = new Stage();
        Parent root = FXMLLoader.load(getClass().getResource("/Customer_Menu.fxml"));
        Scene scene = new Scene(root, 1200, 900);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public ObservableList<Food> getFood() {
        ObservableList<Food> food = FXCollections.observableArrayList();
        food.add(new Food("Cheese", "Some cheese", 15));
        food.add(new Food("Cheese", "Some cheese", 15));
        food.add(new Food("Cheese", "Some cheese", 15));
        return food;
    }

    @FXML
  private void initialize() {

    item.setCellValueFactory(new PropertyValueFactory<Food, String>("item"));
    description.setCellValueFactory(new PropertyValueFactory<Food, String>("description"));
    price.setCellValueFactory(new PropertyValueFactory<Food, Integer>("price"));
  }

}
