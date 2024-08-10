const changePassword = (event) => {
  event.preventDefault();

  if (!isAuthenticated()) {
    window.location.href = "login.html";
    return;
  }

  const user_id = localStorage.getItem("listedandlifted_user_id");
  const old_password = getValue("old-password");
  const password = getValue("password");
  const password2 = getValue("password2");

  console.log(user_id, old_password, password, password2);

  if (password !== password2) {
    showPasswordAlert("Password and confirm password don't match");
    setTimeout(function () {
      window.location.reload();
    }, 3000);
    return;
  }

  try {
    fetch(`https://lifted-listed-backend.onrender.com/user/password_change/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user_id, old_password, password, password2 }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.message !== "undefined") {
          alert("Password changed successfully");
          console.log(response);
          window.location.href = "dashboard.html";
        }
        {
          alert("Old password is not correct!");
          window.location.href = "change_password.html";
        }
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        window.location.href = "dashboard.html";
      });
  } catch (error) {
    console.error("Error:", error);
  }
};

const showPasswordAlert = (message) => {
  const parent = document.getElementById("error-container");
  parent.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <span>${message}</span>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
  parent.appendChild(div);
};
