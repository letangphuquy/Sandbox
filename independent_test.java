import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.util.Base64;

/**
 * independent_test
 */
public class independent_test {

    static void testStringToByteToString(String content) {
        System.out.println("Testing String to byte[] to String");
        Charset charset = Charset.forName("UTF-8");
        byte[] contentBytes = charset.encode(content).array();
        System.out.println(contentBytes.toString() + " // ");
        for (byte b : contentBytes) {
            System.out.print(b + " ");
        }
        System.out.println();
        String decodedContent = charset.decode(ByteBuffer.wrap(contentBytes)).toString();
        System.out.println(decodedContent);
    }

    static void testByteToStringToByte(byte[] data) {
        System.out.println("Testing byte[] to String to byte[]");
        Charset charset = Charset.forName("UTF-8");
        String encodedData = charset.decode(ByteBuffer.wrap(data)).toString();
        System.out.println(encodedData);
        byte[] decodedData = charset.encode(encodedData).array();
        System.out.println(decodedData.toString() + " // " + decodedData);
    }
    public static void main(String[] args) throws Exception {
        String content = "Something random";
        testStringToByteToString(content);
        testByteToStringToByte(new byte[] {83, 111, 109, 101, 116, 104, 105, 110, 103, 32, 114, 97, 110, 100, 111, 109, 0});
    }   
}