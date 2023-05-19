public class Driver {
    public static void main(String[] args) {
        System.out.println("Main program");
        EchoServer server = new EchoServer();
        server.start();
        EchoClient client = new EchoClient();
        client.start();
    }
}
