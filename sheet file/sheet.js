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
    document.location.href = "../index.html";
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
// ################## attendancd marked ############################### \\

document.addEventListener("DOMContentLoaded", renderSavedAttendanceData);
let submitBtn = document.querySelector("#Submit");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  attendanceMarked();
});

function renderSavedAttendanceData() {
  let savedData = localStorage.getItem("attendanceData");
  if (savedData) {
    let data = JSON.parse(savedData);
    let tbody = document.querySelector("#getStudentData");
    tbody.innerHTML = "";

    data.forEach((value, index) => {
      let tr = document.createElement("tr");

      let sno = document.createElement("td");
      sno.textContent = index + 1;

      let sname = document.createElement("td");
      sname.textContent = value.studentName;

      let cname = document.createElement("td");
      cname.textContent = value.courseName;

      let cnum = document.createElement("td");
      cnum.textContent = value.CNICNum;

      let rnum = document.createElement("td");
      rnum.textContent = value.rollNum;

      let classTime = document.createElement("td");
      classTime.textContent = value.classTime;

      let i = document.createElement("i");
      i.className = "fa-solid fa-check";
      let attendanceMark = document.createElement("td");
      attendanceMark.appendChild(i);

      tr.appendChild(sno);
      tr.appendChild(sname);
      tr.appendChild(cname);
      tr.appendChild(cnum);
      tr.appendChild(rnum);
      tr.appendChild(classTime);
      tr.appendChild(attendanceMark);

      tbody.appendChild(tr);
    });
  }
}

function attendanceMarked() {
  let input = document.querySelector("#rollNumber").value.trim();
  let getData = localStorage.getItem("studentData");
  let data = JSON.parse(getData) || [];
  
  let attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];
  let found = false;
  
  for(let value of data) {
    if (input == value.rollNum) {
      found = true;

      let alreadyMarked = attendanceData.some((att) => att.rollNum === input);
      if (alreadyMarked) {
        swal.fire("Attendance already marked");
        return;
      }

      attendanceData.push(value);
      localStorage.setItem("attendanceData", JSON.stringify(attendanceData));

      let tbody = document.querySelector("#getStudentData");
      let tr = document.createElement("tr");

      let sno = document.createElement("td");
      sno.textContent = data.length; 
      let sname = document.createElement("td");
      sname.textContent = value.studentName;

      let cname = document.createElement("td");
      cname.textContent = value.courseName;

      let cnum = document.createElement("td");
      cnum.textContent = value.CNICNum;

      let rnum = document.createElement("td");
      rnum.textContent = value.rollNum;

      let classTime = document.createElement("td");
      classTime.textContent = value.classTime;

      let i = document.createElement("i");
      i.className = "fa-solid fa-check";
      let attendanceMark = document.createElement("td");
      attendanceMark.appendChild(i);

      tr.appendChild(sno);
      tr.appendChild(sname);
      tr.appendChild(cname);
      tr.appendChild(cnum);
      tr.appendChild(rnum);
      tr.appendChild(classTime);
      tr.appendChild(attendanceMark);

      tbody.appendChild(tr);
      
      return;
    }
  }
  
  if (!found) {
    swal.fire("Student data not found");
  }
}
