const modalBox = document.getElementById("modal-box");
const modal = document.getElementById("myModal");
let login = false;
document.getElementById("login-btn").addEventListener("click", function () {
  const textInput = document.getElementById("text-input");
  let name = textInput.value;
  const passwordInput = document.getElementById("password-input");
  let password = passwordInput.value;

  if (name !== "admin") {
    showModal("user not found");
    return;
  } else if (password !== "admin123") {
    showModal("Password incorrect!");
    return;
  } else {
    showModal("Login Success");
    login = true;
  }
});

modal.addEventListener("close", function () {
  if (login) {
    window.location.href = "./home.html";
  }
});

function showModal(massage) {
  modalBox.innerHTML = `  <h3 class="text-lg font-bold">${massage}!</h3>
     <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
    `;
  modal.showModal();
}
