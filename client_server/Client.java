import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.util.Scanner;

public class Client {
    Client() {}
    public static void main(String[] args) {
        try {
            Socket socket = new Socket(Server.HOST, Server.PORT);
            BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
            //Listens to server
            new Thread(() -> {
                try {
                    String msg;
                    while (!(msg = reader.readLine()).isEmpty()) {
                        System.out.println(msg);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }).start();
            //Sends to server
            Scanner consoleReader = new Scanner(System.in);
            String msg;
            while (!(msg = consoleReader.nextLine()).isEmpty()) {
                writer.write(msg);
                writer.newLine();
                writer.flush();
            }

            consoleReader.close();
            socket.close();
        } catch (Exception e) {
            e.printStackTrace();
        } 
    }
}
