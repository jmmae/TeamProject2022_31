import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

public class Main extends Application {

    Button button;
    public static void main(String[] args) {
        launch(args);
    }

    public void start(Stage primaryStage) throws Exception {
        primaryStage.setTitle("Test Window");
        button = new Button();
        button.setText("Test Button");

        StackPane layout = new StackPane();
        layout.getChildren().add(button);

        Scene TestScene = new Scene(layout, 200, 300);
        Parent root = FXMLLoader.load(getClass().getResource("/Customer_menu.fxml"));
        Scene scene = new Scene(root, 1200, 900);
        button.setOnAction(e -> primaryStage.setScene(scene));
        primaryStage.setScene(TestScene);
        primaryStage.show();
    }
}
