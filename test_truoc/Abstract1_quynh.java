package test_truoc;

public abstract class Abstract1_quynh 
{
	private double diemGPA_quynh;												//2 biến private
	private String xeploai_quynh;
	
	public Abstract1_quynh()    			//tên class
	{
		this.diemGPA_quynh = 0;            	//kiểu int, double thì khởi tạo 0
		this.xeploai_quynh = "";			//kiểu String thì ktao “”
	}

	
	public Abstract1_quynh(double diemGPA_quynh, String xeploai_quynh) 			//constructor
	{
        this.diemGPA_quynh = diemGPA_quynh;
        this.xeploai_quynh = xeploai_quynh;
	}
        
    public double getdiemGPA_quynh() 											//get va set 2 bien
    {
        return diemGPA_quynh;
    }

    public void setdiemGPA_quynh(double diemGPA_quynh) 
    {
        this.diemGPA_quynh = diemGPA_quynh;
    }

    public String getxeploai_quynh() 
    {
        return xeploai_quynh;
    }

    public void setxeploai_quynh(String xeploai_quynh) 
    {
        this.xeploai_quynh = xeploai_quynh;
    }
    
    public static void infor_quynh() 											//phuong thuc in thong tin SV
    {
        System.out.println("Nguyen Ngoc Xuan Quynh, 18  tuoi, que quan Da Nang, lop 23AI. ");
    }
    
    public abstract void tinhDiemGPA_quynh();									//2 phthuc truu tuong tinh diem & 

    public abstract String loaiSV_quynh();
}
