import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.util.ArrayList;

public class ClientHandler extends Thread {
    private Socket clientSocket;
    private String username;
    static ArrayList<ClientHandler> clientHandlers = new ArrayList<>();

    private BufferedReader reader;
    private BufferedWriter writer;

    public void print(String msg) throws IOException{
        writer.write(msg);
        writer.newLine();
        writer.flush();
    }

    public ClientHandler(Socket socket) {
        clientSocket = socket;
        clientHandlers.add(this);
        try {
            reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            writer = new BufferedWriter(new OutputStreamWriter(clientSocket.getOutputStream()));
            print("Enter username: ");
            username = reader.readLine();
            setName(username);
        } catch (IOException e) {
            System.out.println("I/O error in initializing connection to " + socket.toString());
        }
    }
    @Override
    public void run() {
        try {
            String msg;
            while (!(msg = reader.readLine()).isEmpty()) {
                broadcastMessage(getName() + ": " + msg);
            }
            reader.close();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    void broadcastMessage(String msg) {
        for (ClientHandler clientHandler : clientHandlers) {
            if (clientHandler == this) continue;
            try {
                clientHandler.print(msg);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
