let cl = console.log;

//CRUD .. Creat, Read , Update and Delete

const studentForm = document.getElementById("studentForm");
const stdContainer = document.getElementById("stdContainer");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

let ls = window.localStorage;

let stdArray = [];

if (ls.getItem("setStdArray")) {
  stdArray = JSON.parse(ls.getItem("setStdArray"));
}

const onEdit = (ele) => {
  let getEditId = ele.getAttribute("data-stdid");
  localStorage.setItem("setEditId", getEditId);
  cl(getEditId);
  let getObj = stdArray.find((obj) => obj.id === getEditId);
  cl(getObj);
  document.getElementById("fname").value = getObj.fname;
  document.getElementById("lname").value = getObj.lname;
  document.getElementById("email").value = getObj.email;
  document.getElementById("contact").value = getObj.contact;
  updateBtn.classList.remove("d-none");
  submitBtn.classList.add("d-none");
};
const onDelete = (ele) => {
  cl(ele.dataset);
  let getDeleteId = ele.dataset.stdid;
  stdArray = stdArray.filter(std => {
    return std.id != getDeleteId
  });
  setStdData();
  cl(ele.parentElement.parentElement);
  ele.parentElement.parentElement.remove()
  // ele.closest("tr").remove();
  templating(stdArray);
};

const templating = (arr) => {
  let result = "";
  arr.forEach((std, i) => {
    result += `
              <tr>
                  <td>${i + 1}</td>
                  <td>${std.fname}</td>
                  <td>${std.lname}</td>
                  <td>${std.email}</td>
                  <td>${std.contact}</td>
                  <td>
                    <button class="btn btn-primary" data-stdid="${std.id}" onclick="onEdit(this)">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-danger" data-stdid="${std.id}" onclick="onDelete(this)">
                      Delete
                    </button>
                  </td>
              </tr>
              `;
    stdContainer.innerHTML = result;
  });
};

templating(stdArray);

const onStdSubmit = (eve) => {
  eve.preventDefault();
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("contact").value;
  const id = uuid()

  let stdObj = { fname, lname, email, contact, id };

  stdArray.push(stdObj);
  ls.setItem("setStdArray", JSON.stringify(stdArray));
  cl(stdArray);
  studentForm.reset();
  templating(stdArray);
};

const onStdUpdate = (eve) => {
  let getUpdateId = localStorage.getItem("setEditId");
  cl(`Updating id = ${getUpdateId}`);
  stdArray.forEach((std) => {
    if (std.id === getUpdateId) {
      std.fname = document.getElementById("fname").value;
      std.lname = document.getElementById("lname").value;
      std.email = document.getElementById("email").value;
      std.contact = document.getElementById("contact").value;
    }
  });
  setStdData();
  studentForm.reset();
  submitBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  templating(stdArray);
  let getBtn = document.querySelector(`[data-stdid = ${getUpdateId}]`);
  cl(getBtn.closest("tr"));
};




studentForm.addEventListener("submit", onStdSubmit);
updateBtn.addEventListener("click", onStdUpdate);

function setStdData() {
  ls.setItem("setStdArray", JSON.stringify(stdArray));
}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
