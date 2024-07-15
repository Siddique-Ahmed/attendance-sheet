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

// ############################# get student data ######################## \\
document.addEventListener("DOMContentLoaded", () => {
  let getData = localStorage.getItem("studentData");

  let setData = getData ? JSON.parse(getData) : [];

  let getStudentData = document.querySelector("#getStudentData");

  let count = 0;

  for (let i = 0; i < setData.length; i++) {
    count++;

    let tr = document.createElement("tr");

    let sno = document.createElement("td");
    let name = document.createElement("td");
    let fname = document.createElement("td");
    let cname = document.createElement("td");
    let tname = document.createElement("td");
    let cnum = document.createElement("td");
    let rnum = document.createElement("td");
    let campname = document.createElement("td");
    let classtime = document.createElement("td");

    sno.textContent = count;
    name.textContent = setData[i].studentName;
    fname.textContent = setData[i].fatherName;
    cname.textContent = setData[i].courseName;
    tname.textContent = setData[i].teacherName;
    cnum.textContent = setData[i].CNICNum;
    rnum.textContent = setData[i].rollNum;
    campname.textContent = setData[i].campus;
    classtime.textContent = setData[i].classTime;

    tr.appendChild(sno);
    tr.appendChild(name);
    tr.appendChild(fname);
    tr.appendChild(cname);
    tr.appendChild(tname);
    tr.appendChild(cnum);
    tr.appendChild(rnum);
    tr.appendChild(campname);
    tr.appendChild(classtime);

    getStudentData.appendChild(tr);
  }
});