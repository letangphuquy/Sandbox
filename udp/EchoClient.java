import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Random;

/**
 * EchoClient
 */
public class EchoClient extends Thread {
    InetAddress toAddress;
    DatagramSocket socket;
    byte[] buffer = new byte[EchoServer.BUFFER_SIZE];
    static int packetCount = 0;

    EchoClient() {
        try {
            socket = new DatagramSocket(new Random().nextInt(65535));
        } catch (SocketException e) {
            System.out.println("Error creating socket: " + e);
        }
        try {
            toAddress = InetAddress.getByName(EchoServer.HOST);
            System.out.println("Address: " + toAddress);
        } catch (UnknownHostException e) {
            System.out.println("Unknown Host! Error: " + e);
        }
    }
    
    void send(byte[] message) throws IOException {
        DatagramPacket toServer = new DatagramPacket(message, 0, message.length, toAddress,
                EchoServer.PORT);
        socket.send(toServer);
    }

    void send(String message) throws IOException {
        send(message.getBytes());
    }

    @Override
    public void run() {
        
        try (FileInputStream fileReader = new FileInputStream("data.txt")) {
            Thread listener = new Thread(new ClientListener());
            listener.start();
            int bytesRead = 0;
            while ((bytesRead = fileReader.read(buffer, 0, buffer.length)) > 0) {
                send(new String(buffer, 0, bytesRead));
            }
            send("end");
            listener.join();
            socket.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (InterruptedException e) {
            System.out.println("Error joining listener thread: " + e);
        }
    }

    class ClientListener implements Runnable {
        @Override
        public void run() {
            byte[] temp = new byte[4 * 1024];
            DatagramPacket fromServer = new DatagramPacket(temp, temp.length);
            try {
                BufferedWriter fileWriter = new BufferedWriter(new FileWriter("responses.txt"));
                while (!socket.isClosed()) {
                    System.out.println("CLIENT/ Listening...");
                    try {
                        socket.receive(fromServer);
                        String message = new String(fromServer.getData(), 0, fromServer.getLength());
                        if ("end".equals(message)) break;
                        ++packetCount;
                        System.out.println("CLIENT/ message:\n" + message);
                        fileWriter.write(message);
                        fileWriter.flush();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                fileWriter.close();
            } catch (IOException e1) {
                e1.printStackTrace();
            } finally {
                System.out.println("CLIENT/ TOTAL Received " + packetCount + " packets");
            }
        }
    }
}