import javafx.application.Application;
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
        primaryStage.setScene(TestScene);
        primaryStage.show();
    }
}