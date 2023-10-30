function NhanVien() {
  this.tknv = "";
  this.name = "";
  this.email = "";
  this.password = "";
  this.datepicker = "";
  this.luongCB = "";
  this.chucvu = "";
  this.gioLam = "";

  this.tongLuong = function () {
    return this.chucvu == "Sếp"
      ? this.luongCB * 3
      : this.chucvu == "Trưởng phòng"
      ? this.luongCB * 2
      : this.chucvu == "Nhân viên"
      ? this.luongCB * 1
      : "";
  };
  this.xepLoai = function () {
    return this.gioLam >= 192
      ? "Xuất sắc"
      : this.gioLam >= 176
      ? "Giỏi"
      : this.gioLam >= 160
      ? "Khá"
      : "Trung bình";
  };
}
