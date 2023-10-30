// lấy id input nhân viên
var arrID = [
    "tknv",
    "name",
    "email",
    "password",
    "datepicker",
    "luongCB",
    "chucvu",
    "gioLam",
  ],
  // arr thông báo
  arrTB = [
    "tbTKNV",
    "tbTen",
    "tbEmail",
    "tbMatKhau",
    "tbNgay",
    "tbLuongCB",
    "tbChucVu",
    "tbGiolam",
  ],
  dsNhanVien = [];
function getEl(e) {
  return document.getElementById(e);
}
document.addEventListener("DOMContentLoaded", function () {
  validateFormOnLoad();
});
function validateFormOnLoad() {
  var check = true;
  for (let i = 0; i < arrID.length; i++) {
    check &= validateField(arrID[i], arrTB[i]);
  }
  return check ? true : false;
}
function getValueUser() {
  var nhanVien = new NhanVien(),
    isValid = true;

  isValid = validateFormOnLoad();
  for (let i = 0; i < arrID.length; i++) {
    var valueInput = getEl(arrID[i]).value;
    nhanVien[arrID[i]] = valueInput;
  }
  if (isValid) {
    return nhanVien;
  }
}
//
getEl("btnThem").addEventListener("click", function () {
  document.querySelector("form").reset();
  getEl("btnCapNhat").style.display = "none";
  getEl("btnThemNV").style.display = "block";
});
//
function addUser() {
  event.preventDefault();

  var nhanVien = getValueUser();

  if (nhanVien) {
    dsNhanVien.push(nhanVien);
    saveLocalUser("arrNhanVien", dsNhanVien);
    renderGUI();
    // alert("thêm thành công");
    document.querySelector("form").reset();
  } else {
    alert("Vui lòng nhập đúng thông tin");
  }
}

function renderGUI(arr) {
  if (!arr) {
    arr = dsNhanVien;
  }
  console.log(arr, "gán ds");
  var content = "";
  for (let i = 0; i < arr.length; i++) {
    const nhanVien = new NhanVien();
    var valueNV = arr[i];
    // sao chép object này vs object kia
    Object.assign(nhanVien, valueNV);
    // console.log(nhanVien);
    content += `
     <tr>
        <td>${nhanVien.tknv}</td>               
        <td>${nhanVien.name}</td>               
        <td>${nhanVien.email}</td>               
        <td>${nhanVien.datepicker}</td>               
        <td>${nhanVien.chucvu}</td>               
        <td>${formatMoney(nhanVien.tongLuong())}</td>               
        <td>${nhanVien.xepLoai()}</td>
        <td>
        <button 
        type="submit"
         onclick="getInfoUser('${nhanVien.tknv}')" 
        class="btn btn-dark mb-2"
        data-toggle="modal" data-target="#myModal"
        >Sửa</button>
        <button class="btn btn-danger mb-2" onclick="deleteUser('${
          nhanVien.tknv
        }')">Xoá</button>
        </td>
            
    </tr>
    `;
  }
  getEl("tableDanhSach").innerHTML = content;
}
// lưu ds dưới localstorage
function saveLocalUser(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  // var valueString = JSON.stringify(value);
  // localStorage.setItem(key, valueString);
}
// lấy ds
function getLocalStore(key) {
  var arrLocal = JSON.parse(localStorage.getItem(key));
  //   kiểm tra dữ liệu
  if (arrLocal) {
    dsNhanVien = arrLocal;
    renderGUI();
  }
}

// editttt
function getInfoUser(taikhoan) {
  console.log(taikhoan);
  var nhanVien = {};
  for (let i = 0; i < dsNhanVien.length; i++) {
    if (dsNhanVien[i].tknv == taikhoan) {
      nhanVien = dsNhanVien[i];
    }
  }
  // console.log(nhanVien);
  for (let i = 0; i < arrID.length; i++) {
    getEl(arrID[i]).value = nhanVien[arrID[i]];
    if (arrID[i] == "tknv") {
      document.getElementById(arrID[i]).readOnly = true;
    }
  }
  getEl("btnThemNV").style.display = "none";
  getEl("btnCapNhat").style.display = "block";
}

function updateUser() {
  var nhanVien = getValueUser();
  index = -1;
  for (let i = 0; i < dsNhanVien.length; i++) {
    if (nhanVien.tknv == dsNhanVien[i].tknv) {
      index = i;
    }
  }
  getEl("tknv").readOnly = false;
  dsNhanVien[index] = nhanVien;
  saveLocalUser("arrNhanVien", dsNhanVien);
  document.querySelector("form").reset();

  renderGUI();
  getEl("btnThemNV").style.display = "block";
  getEl("btnCapNhat").style.display = "none";
}
getEl("btnCapNhat").onclick = updateUser;

// =====xoá
function deleteUser(taikhoan) {
  var index = -1;
  for (let i = 0; i < dsNhanVien.length; i++) {
    var nhanVien = dsNhanVien[i];
    if (nhanVien.tknv == taikhoan) {
      index = i;
    }
  }
  if (index != -1) {
    dsNhanVien.splice(index, 1);
    saveLocalUser("arrSinhVien", dsNhanVien);
    renderGUI();
  }
}
getLocalStore("arrNhanVien");
function formatMoney(amount) {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
}
