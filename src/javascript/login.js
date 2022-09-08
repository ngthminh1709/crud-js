import { getUser } from "./method.js";
import { STUDENTS_PAGE } from "./constant.js";

const $ = document.querySelector.bind(document);

const loginBtn = $(".btn-login");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageError =
  document.getElementById("message-error");

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  window.location.href = STUDENTS_PAGE;
}

const handleLogin = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const data = getUser();

  data
    .then((result) => {
      const checker = result.find(
        (user) =>
          user.email == email && user.password == password
      );
      if (checker) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: checker.email,
            name: checker.name,
          })
        );
        window.location.href = STUDENTS_PAGE;
      } else {
        messageError.innerHTML =
          "Incorrect email and password!";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

loginBtn.addEventListener("click", () => {
  handleLogin();
});
