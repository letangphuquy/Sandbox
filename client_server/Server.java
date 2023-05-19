import java.io.IOException;
import java.net.ServerSocket;

/**
 * Server
 */
public class Server {
    public static final String HOST = "127.1.1.0";
    public static final int PORT = 1524;
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Server is started");
            while (!serverSocket.isClosed()) {
                ClientHandler clientHandler = new ClientHandler(serverSocket.accept());
                System.out.println("Client " + clientHandler.getName() + " connected");
                clientHandler.start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        
    }
}