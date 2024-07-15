let login = document.querySelector("#login");
let loader = document.querySelector(".loaderBox");
let eye = document.querySelector("#eye");
let passEye = document.querySelector("#password");

eye.addEventListener("click", () => {
  checkEye();
});

function checkEye() {
  if (passEye.type === "password") {
    passEye.type = "text";
    eye.classList.add("fa-eye-slash");
    eye.classList.remove("fa-eye");
  } else{
    passEye.type = "password";
    eye.classList.add("fa-eye");
    eye.classList.remove("fa-eye-slash");
  }
}

login.addEventListener("click", (e) => {
  e.preventDefault();
  loginUser();
});

function loginUser() {
  let email = document.querySelector("#email").value.trim();
  let password = document.querySelector("#password").value.trim();

  if (email === "" && password === "") {
    swal.fire("Please fill the required filled");
  } else if (email === "saylanismit123@gmail.com" && password === "smit@123") {
    loader.style.display = "flex";
    setTimeout(() => {
      loader.style.display = "none";
      document.location.href = "./portal files/portal.html";
    }, 2000);
  } else {
    swal.fire("Invalid email or password");
  }
}