function getEl(e) {
  return document.getElementById(e);
}
function getBlock(e) {
  return (getEl(e).style.display = "block");
}
function checkEmpty(value, idSpan) {
  getBlock(idSpan);
  if (value == "") {
    getEl(idSpan).innerHTML = "Vui lòng không bỏ trống";
    // getEl(idSpan).innerHTML = "Vui lòng không bỏ trống";
    return false;
  } else {
    getEl(idSpan).innerHTML = "";
    return true;
  }
}
function checkMinMaxInput(value, idSpan, min, max, string) {
  var dem = value.length;

  if (typeof value === "number") {
    if (value < min || value > max) {
      getEl(
        idSpan
      ).innerHTML = `Vui lòng nhập giá trị từ ${min} đến ${max} ${string}`;
      return false;
    }
    return true;
  } else if (dem >= min && dem <= max) {
    return true;
  } else {
    getEl(
      idSpan
    ).innerHTML = `Vui lòng nhập chuỗi có độ dài từ ${min} đến ${max} cho ${string}`;
    return false;
  }
}

function checkPass(value, idSpan) {
  const hasNumber = /[0-9]/.test(value);
  const hasUppercase = /[A-Z]/.test(value);
  const hasSpecialCharacter = /[!@#$%^&*]/.test(value); // Thêm các ký tự đặc biệt khác vào trong dấu ngoặc vuông nếu cần thiết

  // Kiểm tra tất cả các điều kiện
  //   getBlock(idSpan);
  if (hasNumber && hasUppercase && hasSpecialCharacter) {
    return true;
  } else {
    getEl(idSpan).innerHTML =
      "Mật khẩu chứa ít nhất 1 số, 1 ký tự in hoa, 1 ký tự đặc biệt";
  }
}

function checkDate(value, idSpan) {
  const dateRegex =
    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (dateRegex.test(value)) {
    return true;
  } else {
    getEl(idSpan).innerHTML = "Cần nhập đúng dịnh dạng dd/mm/yyyy";
    return false;
  }
}
function checkEmail(value, idSpan) {
  //   getBlock(idSpan);
  var regexMail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //   sử dụng phương thức test để kiểm tra dữ liệu đầu vào có thoả mãn không
  if (!regexMail.test(value)) {
    getEl(idSpan).innerHTML = "Khônng hợp lệ";
    return false;
  } else {
    // getEl(idSpan).innerHTML = "";
    return true;
  }
}

function checkName(value, idSpan) {
  // Sử dụng biểu thức chính quy để kiểm tra tên nhân viên
  //   getBlock(idSpan);
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(value)) {
    getEl(idSpan).innerHTML = "Tên nhân viên không có ký tự đặc biệt";
    return false;
  }
  return true;
}

function checkNum(value, idSpan) {
  const nameRegex = /^[0-9]+$/;
  if (!nameRegex.test(value)) {
    getEl(idSpan).innerHTML = "Định dạng là số";
    return false;
  }
  return true;
}

function validateField(fieldName, errorId) {
  event.preventDefault();
  const field = getEl(fieldName).value;
  const error = getEl(errorId);

  let isValid = true;

  switch (fieldName) {
    case "tknv":
      isValid &=
        checkEmpty(field, errorId) &&
        checkMinMaxInput(field, errorId, 4, 6, "ký tự là số") &&
        checkNum(field, errorId);
      break;
    case "name":
      isValid &= checkEmpty(field, errorId) && checkName(field, errorId);
      break;
    case "email":
      isValid &= checkEmpty(field, errorId) && checkEmail(field, errorId);
      break;
    case "password":
      isValid &=
        checkEmpty(field, errorId) &&
        checkMinMaxInput(field, errorId, 6, 10, "ký tự") &&
        checkPass(field, errorId);
      break;
    case "datepicker":
      isValid &= checkEmpty(field, errorId) && checkDate(field, errorId);
      break;
    case "luongCB":
      isValid &=
        checkEmpty(field, errorId) &&
        checkNum(field, errorId) &&
        checkMinMaxInput(field * 1, errorId, 1000000, 20000000, "triệu");
      break;
    case "gioLam":
      isValid &=
        checkEmpty(field, errorId) &&
        checkNum(field, errorId) &&
        checkMinMaxInput(field * 1, errorId, 80, 200, "giờ");
      break;
    default:
      isValid &= checkEmpty(field, errorId);
      break;
  }

  if (isValid) {
    // Xóa thông báo lỗi nếu có
    error.innerHTML = "";
  }
  return isValid;
}
