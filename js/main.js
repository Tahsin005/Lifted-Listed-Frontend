const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
}) 

const isAuthenticated = () => {
    const token = localStorage.getItem("listedandlifted_token");
    // console.log(token);

    return token !== null;
};

const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};

const toggleAuthElement = () => {
    const signup_button = document.getElementById("signup-button");
    const add_product_button = document.getElementById("add_product-button");
    const dashboard_button = document.getElementById("dashboard-button");
    const logout_button = document.getElementById("logout-button");

    if (isAuthenticated()) {
        signup_button.style.display = "none";
    } else {
        add_product_button.style.display = "none";
        dashboard_button.style.display = "none";
        logout_button.style.display = "none";
    }
}

window.onload = toggleAuthElement;