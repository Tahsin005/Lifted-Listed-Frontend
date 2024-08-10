const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
}) 

const isAuthenticatedAdmin = () => {
    const boolean = localStorage.getItem("admin");
    // console.log(boolean);

    if (boolean == 0) {
        return false;
    } else {
        return true;
    }
}

const isAuthenticated = () => {
    const token = localStorage.getItem("listedandlifted_token");
    // console.log(token);

    return token !== null;
};

const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};

var is_admin = 0;

const isAdmin = async () => {
    const user_id = localStorage.getItem("listedandlifted_user_id");
    if (!user_id) {
        console.error("User ID not found in localStorage.");
        return false;
    }
    
    try {
        const response = await fetch(`https://lifted-listed-backend.onrender.com/user/allUser/${user_id}`);
        const value = await response.json();
        
        // console.log("Is admin data ---- data", value);
        
        if (value.username === "admin") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return false;
    }
};



const toggleAuthElement = () => {
    const signup_button = document.getElementById("signup-button");
    const add_product_button = document.getElementById("add_product-button");
    const dashboard_button = document.getElementById("dashboard-button");
    const admin_dashboard_button = document.getElementById("admin-dashboard-button");
    const logout_button = document.getElementById("logout-button");

    isAdmin().then(isAdmin => {
        if (isAdmin) {
            console.log("User is an admin.");
            // alert("Admin paisi")
            if (isAuthenticated()) {
                console.log("User is an admin.");
                signup_button.style.display = "none";
                dashboard_button.style.display = "none";
                add_product_button.style.display = "none";
            } else {
                logout_button.style.display = "none";
            }
        } else {
            console.log("User is not admin.");
            if (isAuthenticated()) {
                signup_button.style.display = "none";
                admin_dashboard_button.style.display = "none";
            } else {
                admin_dashboard_button.style.display = "none";
                add_product_button.style.display = "none";
                dashboard_button.style.display = "none";
                logout_button.style.display = "none";
            }
        }
    });
}



window.onload = toggleAuthElement;
isAdmin();
