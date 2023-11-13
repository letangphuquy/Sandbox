import java.util.Scanner;

public class independent_test {    
    public static void main(String[] args) {
        try (Scanner inp = new Scanner(System.in)) {
            System.out.println("Enter the number of students: ");
            int n = inp.nextInt();
            inp.nextLine();
            // parse int
            Integer.parseInt(inp.nextLine());
            Double.parseDouble(inp.nextLine());
            Float.parseFloat(inp.nextLine());
            Long.parseLong(inp.nextLine());
            
            for (int i = 0; i < n; i++) {
                System.out.print("Name: ");
                String name = inp.nextLine();
                System.out.print("Age: ");
                int age = inp.nextInt();
                System.out.println("Recorded: " + name + " " + age);
            }
        }
    }   
}



