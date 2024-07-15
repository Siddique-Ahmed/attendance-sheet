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

addStudentBtn.addEventListener("click", () => {
  loader.style.display = "flex";
  setTimeout(() => {
    loader.style.display = "none";
    addStudentBtn.style.display = "none";
    studentForm.style.display = "flex";
  }, 1200);
});

cancel.addEventListener("click", () => {
  addStudentBtn.style.display = "block";
  studentForm.style.display = "none";
});

// ############### submit student Data ########################## \\

// Initialize elements and data
let submitStudentData = document.querySelector("#submitStudentData");
let data = [];
let studentData = {};

// Load existing student data from localStorage
function loadDataToLocalStorage() {
  let setData = localStorage.getItem("studentData");
  if (setData) {
    data = JSON.parse(setData);
  }
}
loadDataToLocalStorage();

// Event listener for form submission
submitStudentData.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default form submission
  submitData(); // Call submit data function
});

// Function to submit student data
function submitData() {
  // Fetch values from input fields
  let studentName = document.querySelector("#sName").value;
  let fatherName = document.querySelector("#fName").value;
  let courseName = document.querySelector("#CName").value;
  let teacherName = document.querySelector("#tName").value;
  let CNICNum = document.querySelector("#cNum").value;
  let rollNum = document.querySelector("#rNum").value;
  let campus = document.querySelector("#campName").value;
  let classTime = document.querySelector("#cTime").value;

  // Validate required fields
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

  // Validate name lengths
  if (studentName.length > 30 || studentName.length < 3) {
    swal.fire("Name must be between 3 and 30 characters");
    return;
  }
  if (fatherName.length > 30 || fatherName.length < 3) {
    swal.fire("Father's name must be between 3 and 30 characters");
    return;
  }

  // Create student data object
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

  // Check if roll number already exists
  if (!saveToLocalStorage(rollNum)) {
    // If roll number is unique, add student data to array and save to localStorage
    data.push(studentData);
    localStorage.setItem("studentData", JSON.stringify(data));

    // Show loader and reset form after a delay
    loader.style.display = "flex";
    setTimeout(() => {
      loader.style.display = "none";
      studentForm.style.display = "none";
      addStudentBtn.style.display = "block";
      resetForm();
    }, 1200);
  }
}

// Function to reset form fields
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

// Function to check for duplicate roll numbers and save to localStorage
function saveToLocalStorage(newRollNum) {
  // Check if roll number already exists
  let isSame = data.some((check) => check.rollNum === newRollNum);
  if (isSame) {
    swal.fire("Student already enrolled");
    return true;
  } else {
    return false;
  }
}
