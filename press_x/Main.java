import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;

public class Main {
    public static void main(String[] args) {
        //add EventQueue class
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                JFrame frame = new JFrame();
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.setResizable(false);
                // screen width
                var windowBounds = java.awt.GraphicsEnvironment.getLocalGraphicsEnvironment().getMaximumWindowBounds();
                int screenWidth = windowBounds.width;
                int screenHeight = windowBounds.height;
                frame.setLocation(screenWidth - 100, screenHeight / 2);
                frame.setSize(50, 100);
                JButton xKeyButton = new JButton("X");
                xKeyButton.addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        Robot robot;
                        try {
                            robot = new Robot();
                            robot.keyPress(88);
                        } catch (AWTException e1) {
                            // TODO Auto-generated catch block
                            e1.printStackTrace();
                        }
                    }
                });
                frame.add(xKeyButton);
                frame.setVisible(true);

            }
        });
        // System.out.println("Hello, World!");
    }
}
