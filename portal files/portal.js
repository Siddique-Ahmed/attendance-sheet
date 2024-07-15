// ################################# portal section ################################ //

let user = document.querySelector("#user");
let logout = document.querySelector("#logout");
let loader = document.querySelector(".loaderBox");

user.addEventListener("click", () => {
  out();
});

function out() {
  if (logout.style.display === "none") {
    logout.style.display = "block";
  } else {
    logout.style.display = "none";
  }
}

logout.addEventListener("click", () => {
  loader.style.display = "flex";
  setTimeout(() => {
    document.location.href = "./index.html";
    loader.style.display = "none";
  }, 2000);
});
// ################################ hamburger Script ####################################### \\
let hamburger = document.querySelector("#hamburger");
let list = document.querySelector(".navbar .list");

hamburger.addEventListener("click", () => {
  hamburgerUP();
});
function hamburgerUP() {
  if (list.style.top === "-900px") {
    list.style.top = "0";
    hamburger.classList.add("fa-xmark");
    hamburger.classList.remove("fa-bars");
  } else {
    list.style.top = "-900px";
    hamburger.classList.add("fa-bars");
    hamburger.classList.remove("fa-xmark");
  }
}
// ############################### student data get script ############################### \\
let addStudentBtn = document.querySelector("#addStudent");
let studentForm = document.querySelector(".studentForm");
let cancel = document.querySelector("#cancel");
let excelBox = document.querySelector(".excelBox");

addStudentBtn.addEventListener("click", () => {
  loader.style.display = "flex";
  setTimeout(() => {
    loader.style.display = "none";
    addStudentBtn.style.display = "none";
    excelBox.style.display = "none";
    studentForm.style.display = "flex";
  }, 1200);
});

cancel.addEventListener("click", () => {
  addStudentBtn.style.display = "block";
  studentForm.style.display = "none";
  excelBox.style.display = "flex";
});

// ############### submit student Data ########################## \\

let submitStudentData = document.querySelector("#submitStudentData");
let data = [];
let studentData = {};

function loadDataToLocalStorage() {
  let setData = localStorage.getItem("studentData");
  if (setData) {
    data = JSON.parse(setData);
  }
}
loadDataToLocalStorage();

submitStudentData.addEventListener("click", (e) => {
  e.preventDefault();
  submitData();
});

function submitData() {
  let studentName = document.querySelector("#sName").value;
  let fatherName = document.querySelector("#fName").value;
  let courseName = document.querySelector("#CName").value;
  let teacherName = document.querySelector("#tName").value;
  let CNICNum = document.querySelector("#cNum").value;
  let rollNum = document.querySelector("#rNum").value;
  let campus = document.querySelector("#campName").value;
  let classTime = document.querySelector("#cTime").value;

  if (
    studentName === "" ||
    fatherName === "" ||
    courseName === "" ||
    teacherName === "" ||
    CNICNum === "" ||
    rollNum === "" ||
    campus === "" ||
    classTime === ""
  ) {
    swal.fire("Please fill the required fields");
    return;
  }

  if (studentName.length > 30 || studentName.length < 3) {
    swal.fire("Name must be between 3 and 30 characters");
    return;
  }
  if (fatherName.length > 30 || fatherName.length < 3) {
    swal.fire("Father's name must be between 3 and 30 characters");
    return;
  }

  studentData = {
    studentName: studentName,
    fatherName: fatherName,
    courseName: courseName,
    teacherName: teacherName,
    CNICNum: CNICNum,
    rollNum: rollNum,
    campus: campus,
    classTime: classTime,
  };

  if (!saveToLocalStorage(rollNum)) {
    data.push(studentData);
    localStorage.setItem("studentData", JSON.stringify(data));

    setTimeout(() => {
      studentForm.style.display = "none";
      excelBox.style.display = "flex";
      addStudentBtn.style.display = "block";
      resetForm();
    }, 1200);
    swal.fire("data added successfully")
  }
}

function resetForm() {
  document.querySelector("#sName").value = "";
  document.querySelector("#fName").value = "";
  document.querySelector("#CName").value = "";
  document.querySelector("#tName").value = "";
  document.querySelector("#cNum").value = "";
  document.querySelector("#rNum").value = "";
  document.querySelector("#campName").value = "";
  document.querySelector("#cTime").value = "";
}

function saveToLocalStorage(newRollNum) {
  let isSame = data.some((check) => check.rollNum === newRollNum);
  if (isSame) {
    swal.fire("Student already enrolled");
    return true;
  } else {
    return false;
  }
}

// #################### excel file to json and save in localstorage ###################### \\

document.getElementById('excelBtn').addEventListener('click', function() {
  const fileInput = document.getElementById('excelFile');
  const file = fileInput.files[0];
  if (!file) {
      swal.fire('Please select an Excel file first.');
      return;
  }
  const reader = new FileReader();

  reader.onload = function(e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      localStorage.setItem("excelData",JSON.stringify(json, null, 2));
      
  };

  reader.readAsArrayBuffer(file);
  swal.fire("data added successfully")
});
