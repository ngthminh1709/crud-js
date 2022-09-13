import {
  CREATE_ERROR_MESSAGE,
  LOGIN_PAGE,
} from "./constant.js";
import Method from "./method.js";
const {
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
} = new Method();

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Query elements modal
const btnAdd = $("#btn-add");
const btnDelete = $("#btn-delete-checked");
const btnClose = $("#btn-close");
const btnSave = $("#btn-save");
const modalContainer = $("#modal-container");

//Query elements
const searchBox = $("#search-box");
const logoutBtn = $(".logout");
const formAdd = $("#form-add");
const nameStudent = $("#name");
const emailStudent = $("#email");
const phoneStudent = $("#phone");
const enrollNumber = $("#enroll-number");
const dateOfAdmission = $("#date-of-admission");
const avatar = $("#upload-avatar");
const userAvatar = $(".avatar");
const job = $(".job");
const username = $(".name");
const avatarPreview = $("#avatar-preview");
const checkAll = $("#check-all");
const studentList = $("#students-list");

const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = LOGIN_PAGE;
}

var studentsArray = [];

username.innerHTML = user.name;
userAvatar.src = user.avatar;
job.innerHTML = user.role;

const afterGet = (msg) => {
  getStudent()
    .then((student) => renderStudents(student))
    .catch((error) => {
      console.log(error);
      alert("Error: " + msg);
    });
};

const start = () => {
  getStudent().then((student) => {
    studentsArray = student;
    renderStudents(student);
  });
  handleSearch();
};

const hideModal = () => {
  modalContainer.classList.remove("show");
};

const showModal = () => {
  modalContainer.classList.add("show");
};

// Upload avatar picture
avatar.onchange = () => {
  uploadFile();
};

const uploadFile = () => {
  const reader = new FileReader();
  const file = avatar.files[0];
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    avatarPreview.src = reader.result;
  };
};

checkAll.addEventListener("click", () => {
  const checkedArray = $$(".user-checkbox");
  checkedArray.forEach((item) => {
    item.checked && checkAll.checked
      ? (item.checked = true)
      : (item.checked = !item.checked);
    item.onclick = () => {
      !item.checked && checkAll.checked
        ? (checkAll.checked = false)
        : true;
    };
  });
});

const handleCheckBox = async () => {
  const checked = Array.from($$(".user-checkbox")).filter(
    (item) => item.checked
  );
  if (!checked.length) return;

  const confirm = window.confirm(
    "Are you sure you want to delete all checked user?"
  );
  if (!confirm) return;

  for (const item of checked) {
    await deleteStudent(item.value);
  }
  afterGet("Error When deleting student!");
};

const innerHtml = (formData) => {
  return `<tr class="students-value student-${formData.id}">
  <td><input class="user-checkbox" type="checkbox" value="${formData.id}"/></td>
  <td>
    <img class="img-avatar" src="${formData.avatar}" alt="">
  </td>
  <td>${formData.name}</td>
  <td>${formData.email}</td>
  <td>${formData.phone}</td>
  <td>${formData.enrollNumber}</td>
  <td>${formData.dateOfAdmission}</td>
  <td>
    <button class="action-btn btn-edit" id="${formData.id}">
      <img src="./assets/icons/edit-icon.svg" alt="">
    </button>
    <button class="action-btn btn-delete" id="${formData.id}">
      <img src="./assets/icons/delete-icon.svg" alt="">
    </button>
  </td>
</tr>`;
};

const renderStudents = (student) => {
  const element = student
    //Filter the name search box and display it on the table
    .filter(
      (field) =>
        field.name
          .toLowerCase()
          .includes(searchBox.value.trim()) ||
        field.email
          .toLowerCase()
          .includes(searchBox.value.trim()) ||
        field.phone
          .toLowerCase()
          .includes(searchBox.value.trim())
    )

    //Display student information in the table
    .map((field) => {
      const html = innerHtml(field);
      return html;
    });
  studentList.innerHTML = element.join("");

  const btnEdit = $$(".btn-edit");
  // Popup to add user when clicking on edit button.
  btnEdit.forEach((item) => {
    item.addEventListener("click", () => {
      modalContainer.classList.add("show");
      handleUpdate(item.id);
    });
  });

  const btnDel = $$(".btn-delete");
  btnDel.forEach((item) => {
    item.addEventListener("click", () => {
      handleDelete(item.id);
    });
  });
};

const handleSubmit = async () => {
  const formData = {
    id: Math.floor(Math.random() * 1000),
    name: nameStudent.value,
    email: emailStudent.value,
    phone: phoneStudent.value,
    enrollNumber: enrollNumber.value,
    dateOfAdmission: dateOfAdmission.value,
    avatar: avatarPreview.src,
  };

  await createStudent(formData);

  studentsArray.push(formData);
  renderStudents(studentsArray);

  hideModal();
};

// Delete student function
const handleDelete = (id) => {
  const confirm = window.confirm(
    "Are you sure you want to delete?"
  );
  if (!confirm) return;

  deleteStudent(id).then(() => {
    const student = $(`.student-${id}`);
    student && student.remove();
  });
};

//Search students function
const handleSearch = () => {
  searchBox.addEventListener("keyup", function (e) {
    renderStudents(studentsArray);
  });
};

// Update students function

const handleUpdate = (id) => {
  getStudent()
    .then((student) => {
      student.forEach((item) => {
        if (item.id == id) {
          nameStudent.value = item.name;
          emailStudent.value = item.email;
          phoneStudent.value = item.phone;
          enrollNumber.value = item.enrollNumber;
          dateOfAdmission.value = item.dateOfAdmission;
          avatarPreview.src = item.avatar;
        }
      });
    })
    .catch((error) => {
      console.log(error);
      alert("Error: " + error);
    });

  const handleEdit = () => {
    const formData = {
      id,
      avatar: avatarPreview.src || "",
      name: nameStudent.value,
      email: emailStudent.value,
      phone: phoneStudent.value,
      enrollNumber: enrollNumber.value,
      dateOfAdmission: dateOfAdmission.value,
    };
    const arrayInstances = studentsArray.map((item) => {
      if (item.id == id) {
        return formData;
      }
      return item;
    });
    updateStudent(id, formData);

    studentsArray = arrayInstances;
    renderStudents(arrayInstances);

    hideModal();

    btnSave.removeEventListener("click", handleEdit);
  };

  btnSave.removeEventListener("click", handleSubmit);

  btnSave.addEventListener("click", handleEdit);
};

const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "./login.html";
};

btnAdd.addEventListener("click", showModal);
btnClose.addEventListener("click", hideModal);

btnDelete.addEventListener("click", handleCheckBox);

btnSave.addEventListener("click", handleSubmit);

logoutBtn.addEventListener("click", handleLogout);

start();
