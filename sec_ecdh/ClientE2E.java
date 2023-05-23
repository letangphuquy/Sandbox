import java.io.*;
import java.net.Socket;
import java.security.*;
import java.security.spec.ECGenParameterSpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;

public class ClientE2E {
    private static final String SERVER_ADDRESS = "localhost";
    private static final int SERVER_PORT = 12345;
    private static final String EC_ALGORITHM = "secp256r1";
    private static final String SYMMETRIC_ALGORITHM = "AES";

    public static void main(String[] args) {
        try {
            Socket socket = new Socket(SERVER_ADDRESS, SERVER_PORT);
            System.out.println("Connected to server: " + socket.getInetAddress());

            BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter writer = new PrintWriter(socket.getOutputStream(), true);

            // Generate client's key pair
            KeyPair clientKeyPair = generateKeyPair();

            // Send client's public key to the server
            byte[] clientPublicKeyBytes = clientKeyPair.getPublic().getEncoded();
            writer.println(bytesToHex(clientPublicKeyBytes));

            // Receive server's public key
            String serverPublicKeyHex = reader.readLine();
            byte[] serverPublicKeyBytes = hexToBytes(serverPublicKeyHex);

            // Generate shared secret key
            KeyAgreement keyAgreement = KeyAgreement.getInstance("ECDH");
            keyAgreement.init(clientKeyPair.getPrivate());
            keyAgreement.doPhase(KeyFactory.getInstance("EC").generatePublic(new X509EncodedKeySpec(serverPublicKeyBytes)), true);
            byte[] sharedSecret = keyAgreement.generateSecret();
            System.out.println("Shared secret (for testing purposes): " + bytesToHex(sharedSecret));

            // Create secret key from shared secret
            SecretKeySpec secretKeySpec = new SecretKeySpec(sharedSecret, SYMMETRIC_ALGORITHM);

            // Encrypt and send the message to the server
            String message = "Hello Server!";
            int length = (1<<15);
            message = new String(new char[length]).replace("\0", "a");
            String encryptedMessage = encryptMessage(message, secretKeySpec);
            writer.println(encryptedMessage);

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

    private static String encryptMessage(String message, SecretKeySpec secretKey)
            throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException,
            BadPaddingException {
        Cipher cipher = Cipher.getInstance(SYMMETRIC_ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);

        byte[] encryptedBytes = cipher.doFinal(message.getBytes());

        return bytesToHex(encryptedBytes);
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
