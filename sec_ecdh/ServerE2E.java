import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.security.*;
import java.security.spec.ECGenParameterSpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;

public class ServerE2E {
    private static final int SERVER_PORT = 12345;
    private static final String EC_ALGORITHM = "secp256r1";
    private static final String SYMMETRIC_ALGORITHM = "AES";

    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(SERVER_PORT)) {
            System.out.println("Server started, waiting for clients...");

            while (true) {
                Socket socket = serverSocket.accept();
                System.out.println("Client connected: " + socket.getInetAddress());

                // Handle client communication in a separate thread
                Thread clientThread = new Thread(() -> handleClient(socket));
                clientThread.start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void handleClient(Socket socket) {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter writer = new PrintWriter(socket.getOutputStream(), true);

            // Generate server's key pair
            KeyPair serverKeyPair = generateKeyPair();

            // Send server's public key to the client
            byte[] serverPublicKeyBytes = serverKeyPair.getPublic().getEncoded();
            writer.println(bytesToHex(serverPublicKeyBytes));

            // Receive client's public key
            String clientPublicKeyHex = reader.readLine();
            byte[] clientPublicKeyBytes = hexToBytes(clientPublicKeyHex);

            // Generate shared secret key
            KeyAgreement keyAgreement = KeyAgreement.getInstance("ECDH");
            keyAgreement.init(serverKeyPair.getPrivate());
            keyAgreement.doPhase(KeyFactory.getInstance("EC").generatePublic(new X509EncodedKeySpec(clientPublicKeyBytes)), true);
            byte[] sharedSecret = keyAgreement.generateSecret();

            // Create secret key from shared secret
            SecretKeySpec secretKeySpec = new SecretKeySpec(sharedSecret, SYMMETRIC_ALGORITHM);

            // Receive encrypted message from the client
            String encryptedMessage = reader.readLine();
            System.out.println("Received encrypted message from client: " + encryptedMessage + ", size = " + encryptedMessage.getBytes().length);

            // Decrypt the message
            String decryptedMessage = decryptMessage(encryptedMessage, secretKeySpec);
            System.out.println("Decrypted message: " + decryptedMessage + ", size = " + decryptedMessage.getBytes().length);

            socket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static KeyPair generateKeyPair() throws NoSuchAlgorithmException, InvalidAlgorithmParameterException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("EC");
        ECGenParameterSpec ecSpec = new ECGenParameterSpec(EC_ALGORITHM);
        keyPairGenerator.initialize(ecSpec);
        return keyPairGenerator.generateKeyPair();
    }

    private static String decryptMessage(String encryptedMessage, SecretKeySpec secretKey)
            throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException,
            BadPaddingException {
        Cipher cipher = Cipher.getInstance(SYMMETRIC_ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);

        byte[] encryptedBytes = hexToBytes(encryptedMessage);
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);

        return new String(decryptedBytes);
    }

    private static byte[] hexToBytes(String hexString) {
        int len = hexString.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(hexString.charAt(i), 16) << 4)
                    + Character.digit(hexString.charAt(i + 1), 16));
        }
        return data;
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02X", b));
        }
        return sb.toString();
    }
}
