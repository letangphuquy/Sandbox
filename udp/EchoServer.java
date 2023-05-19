//https://www.baeldung.com/udp-in-java
//Receives messages from EchoClient.java and mirrors to console

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;

public class EchoServer extends Thread {
    public final static String HOST = "LAPTOP-03G6O7A4";
    public final static int PORT = 1524;
    public final static int BUFFER_SIZE = 256; //ASCII characters
    private DatagramSocket socket;
    private byte[] buffer = new byte[BUFFER_SIZE];

    EchoServer() {
        try {
            
            socket = new DatagramSocket(PORT);
        } catch (SocketException e) {
            System.out.println("Error creating socket: " + e);
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        try (PrintWriter writer = new PrintWriter(new FileWriter("server_logs.txt"))) {
            boolean running = true;
            while (running) {
                DatagramPacket fromClient = new DatagramPacket(buffer, buffer.length);
                try {
                    socket.receive(fromClient);
                    InetAddress address = fromClient.getAddress();
                    int port = fromClient.getPort();
                    String message = new String(fromClient.getData(), 0, fromClient.getLength());
                    if ("end".equals(message)) running = false;
                    writer.println("SERVER/ Message from " + address + ":" + port + ":\n" + message);
    
                    byte[] temp = message.getBytes();
                    writer.println("SERVER/ Received: " + fromClient.getLength() + "; Sendback: " + temp.length + " bytes");
                    // writer.println("\tSERVER/ Preview:\n" + new String(temp, 0, temp.length));
                    DatagramPacket toClient = new DatagramPacket(temp, 0, temp.length, address, port);
                    socket.send(toClient);
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } finally {
                    writer.flush();
                }
            }
            socket.close();
        } catch (IOException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
    }
}
