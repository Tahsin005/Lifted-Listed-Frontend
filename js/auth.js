const handleRegistration = (event) => {
    event.preventDefault()
    // alert()
    const username = getValue("username")
    const password = getValue("password")
    const confirm_password = getValue("confirm_password")
    const first_name = getValue("first_name")
    const last_name = getValue("last_name")
    const email = getValue("email")
    const info = {username, first_name, last_name, email, password, confirm_password};
    // console.log(info);
    if (password === confirm_password) {
            if (username && email) {
                // window.location.href = "index.html";
                try {
                    const formData = new FormData();
                    formData.append("username", username);
                    formData.append("first_name", first_name);
                    formData.append("last_name", last_name);
                    formData.append("email", email);
                    formData.append("password", password);
                    formData.append("confirm_password", confirm_password);
                    fetch("https://lifted-listed-backend.onrender.com/user/register/", {
                        method: "POST",
                        body: formData,
                    })
                        .then((response) => {
                            if (response.status === 200) {
                                alert("Check You Email For Confirmation Link");
                                window.location.href = "login.html";
                                // console.log(response.statusText);
                            } else {
                                // console.log("Registration failed with status code:", response.status);
                                showPasswordAlert(response.statusText)
                            }
                        })

                } catch (err) {
                    console.log(err)
                }
            }
            else {
                showPasswordAlert("Image is required.")
                showPasswordAlert("Username is required.")
            }
    } else {
        showPasswordAlert("Your passwords do not match.")
    }

};


const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("username-login");
    const password = getValue("password-login");
    // console.log(username, password);
    if (username && password) {
        fetch("https://lifted-listed-backend.onrender.com/user/login/", {
            method: "POST",
            headers: { 
                "content-type": "application/json" 
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then((data) => {
                console.log("---", data);
                if (data.token && data.user_id) {
                    localStorage.setItem("listedandlifted_token", data.token);
                    localStorage.setItem("listedandlifted_user_id", data.user_id);
                    console.log(data.user_id);
                    const user_id = data.user_id
                    fetch(`https://lifted-listed-backend.onrender.com/user/account/?user_id=${user_id}`)
                        .then(res => res.json())
                        .then((value) => {
                            console.log("all data " , value);
                            console.log(value[0].id);
                            var ID = 0;
                            value.forEach(element => {
                                console.log(element.user);
                                if (element.user == data.user_id) {
                                    console.log("paisi baal");
                                    ID = element.id;
                                    console.log(ID);
                                }
                            });
                            if (data && value && ID) {
                                localStorage.setItem("listedandlifted_user_account", ID);
                                if (value.id == 15) {
                                    console.log("Ami admin");
                                    localStorage.setItem("admin", 1);
                                    
                                } else {
                                    localStorage.setItem("admin", 0);
                                }
                                const user_account = localStorage.getItem("listedandlifted_user_account");
                                alert("Logged in successfully");
                                window.location.href = "index.html";
                            }
                        })
                }
                else {
                    showPasswordAlert("Invalid username or password.")
                }
            })
            .catch(error => {
                console.error("Error while logging in:", error);
            });
    }
};
const showPasswordAlert = (message) => {
    const parent = document.getElementById("error-container");
    parent.innerHTML = ""
    const div = document.createElement("div");
    div.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <span>${message}</span>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
    parent.appendChild(div);
    alert("Enter valid username or password");
    setTimeout(function() {
        window.location.reload();
    }, 1000);
}