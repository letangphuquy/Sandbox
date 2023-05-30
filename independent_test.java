import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.util.Base64;
import java.util.stream.Stream;

/**
 * independent_test
 */
public class independent_test {
    static void print(Object[] obj) {
        System.out.println("Debug: " + obj);
        Stream.of(obj).forEach(System.out::println);
    }
    public static void main(String[] args) {
        User user = new User("username", "password", "userID");
        Object[] obj = user.toObjectArray();
        print(obj);
        obj[0] = "abc";
        print(obj);
        System.out.println("Printing to see if user's data is modified:");
        print(user.toObjectArray());
    }   
}
class User {
    String username;
    String password;
    String userID;
    public User(String username, String password, String userID) {
        this.username = username;
        this.password = password;
        this.userID = userID;
    }
    Object[] toObjectArray() {
        return new Object[] {username, password, userID};
    }
}