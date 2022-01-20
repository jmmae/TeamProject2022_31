import javafx.*;

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
        primaryStage.setScene(scene);
        primaryStage.show();
    }
}