package test_truoc;
import java.util.Scanner;

public class SinhVien_quynh extends Abstract1_quynh implements QuanLySinhVien_quynh, ThongKe_quynh 
{
	private String tenSinhVien_quynh;
	private int tuoi_quynh;
	
	public SinhVien_quynh(double diemGPA_quynh, String xeploai_quynh) 
	{
        super(diemGPA_quynh, xeploai_quynh);
    }
	
    @Override	
    public void tinhDiemGPA_quynh()							//nhap diem GPA
    {
    	Scanner sc = new Scanner(System.in);
    	System.out.print("Nhập điểm : ");
    	double diemTB_quynh = sc.nextDouble();
        setdiemGPA_quynh(diemTB_quynh);
        //sc.close();
    }
    @Override	
    public String loaiSV_quynh() 							//xep loai sv dua vao diem GPA
    {
        double diemGPA = getdiemGPA_quynh();
        if (diemGPA >= 3.8 && diemGPA <= 4.0) 
        {
            return "Xuất sắc";
        } 
        else if (diemGPA >= 3.5 ) 
        {
            return "Giỏi";
        } 
        else if (diemGPA >= 3.3 ) 
        {
            return "Khá";
        } 
        else 
        {
            return "Trung bình";
        }
    }
    @Override
    public int tinhTuoi() 									//tính tuổi dựa trên năm sinh
    {									
        Scanner scanner = new Scanner(System.in);
        System.out.print("Nhập năm sinh: ");
        int namSinh = scanner.nextInt();
        //scanner.close(); 
        int tuoi_quynh = 2023 - namSinh;
        System.out.println("Số tuổi: " + tuoi_quynh);
        settuoi_quynh(tuoi_quynh);
        return tuoi_quynh;
    }
    @Override
    public String hocBong() 								//có được nhận học bổng hay không 
    {
        String xepLoai_quynh = loaiSV_quynh();
        
        if (xepLoai_quynh.equals("Xuất sắc") || xepLoai_quynh.equals("Giỏi") ) 
        {
            return "Học bổng được cấp";
        } 
        else 
        {
            return "Không được học bổng";
        }
    }
    @Override
    public String nhaptenSV_quynh() 						// nhập và trả về tên sinh viên 
    {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Nhập tên sinh viên: ");
        String ten_quynh = scanner.nextLine();
        settenSinhVien_quynh(ten_quynh);
        //scanner.close(); 
        return ten_quynh;
    }
    private void settenSinhVien_quynh(String ten_quynh) 
    {
		this.tenSinhVien_quynh=ten_quynh;
	}
    private void settuoi_quynh(int tuoi_quynh) 
    {
		this.tuoi_quynh = tuoi_quynh;
	}
    
	@Override
    public void inThanhTich_quynh() 						// in thành tích của sinh viên 
    {
        System.out.println("\n***********  Bảng thành tích  **********");
        System.out.println("Tên sinh viên: " + tenSinhVien_quynh);
        System.out.println("Tuổi:          " + tuoi_quynh );
        System.out.println("Điểm GPA:      " + getdiemGPA_quynh());
        System.out.println("Xếp loại:      " + loaiSV_quynh());
        System.out.println("Học bổng:      " + hocBong());
        System.out.println("\n****************************************");
    }
}


