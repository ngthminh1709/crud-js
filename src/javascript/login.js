import Method from "./method.js";
import Validator from "./validate.js";
import { STUDENTS_PAGE } from "./constant.js";
const { getUser } = new Method();
const $ = document.querySelector.bind(document);

const loginBtn = $(".btn-login");
const loginForm = $("#form-login");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageError =
  document.getElementById("message-error");

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  window.location.href = STUDENTS_PAGE;
}

const handleLogin = async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) return;

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
            role: checker.role,
            avatar: checker.avatar,
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

loginForm.addEventListener("submit", handleLogin);


Validator({
  form: '#form-login',
  formGroupSelector: '.form-group',
  errorSelector: '.form-message',
  rules: [
    Validator.isEmail('#email'),
    Validator.isRequired('#password', 'Vui Lòng Nhập Mật Khẩu')
  ],
});
