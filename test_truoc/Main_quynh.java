package test_truoc;

import java.util.Scanner;

public class Main_quynh {

	public static void main(String[] args) 
	{
		SinhVien_quynh student = new SinhVien_quynh(0, ""); // Tạo đối tượng SinhVien_quynh

    	Scanner sc = new Scanner(System.in);

		System.out.println("******************  Menu  **********************");
		System.out.println("1. Nhập tên sinh viên ");
		System.out.println("2. Tính tuổi của sinh viên dựa vào năm sinh ");
		System.out.println("3. Nhập điểm GPA ");
		System.out.println("4. Xếp loại sinh viên dựa vào điểm GPA ");
		System.out.println("5. Sinh viên có được nhận học bổng không? ");
		System.out.println("6. In ra bảng thành tích của sinh viên ");
		System.out.println("7. Kết thúc chương trình ");
		System.out.println("************************************************");
		
		
		int n_quynh=1;
		int check_quynh=1;
		while(check_quynh==1 || check_quynh==2)
		{

			System.out.print("Vui long chọn một chức năng: ");
			n_quynh = sc.nextInt();
			while (n_quynh<1 || n_quynh>7 )
			{
				System.out.print("Vui long chọn một chức năng: ");
				n_quynh = sc.nextInt();
			}
			
			if( n_quynh==1 ) student.nhaptenSV_quynh(); 														//1. nhap ten sinh vien
			else if( n_quynh==2 ) student.tinhTuoi(); 														//2. tinh tuoi sinh vien dua nam sinh
			else if( n_quynh==3 ) student.tinhDiemGPA_quynh(); 												//3. nhap diem GPA 
			else if( n_quynh==4 ) System.out.println("Xếp loại sinh viên: " + student.loaiSV_quynh());			//4. xep loai sinh vien dua vao diem GPA
			else if( n_quynh==5 ) System.out.println("Quyết định: " + student.hocBong());						//5. quyet dinh co duoc nhan hoc bong hay kkhong dua vao xep loai
			else if( n_quynh==6 ) student.inThanhTich_quynh();												//6. in ra thanh tich cua sinh vien
			else if( n_quynh==7 ) 
			{
				System.out.print("//   Chương trình kết thúc tại đây  ///");
				break;

			}
			sc.close();
		}

	}

}
