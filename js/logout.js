const handleLogout = () => {
    // alert()
    const token = localStorage.getItem("listedandlifted_token");
    fetch("https://shortlisted.onrender.com/user/logout/", {
        method: "GET",
        authorization: `Token ${token}`,
        headers: { "content-type": "application/json" },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        localStorage.removeItem('listedandlifted_token')
        localStorage.removeItem('listedandlifted_user_id')
        localStorage.removeItem('listedandlifted_user_account')
        alert("Logged Out Successfully")
        window.location.href = "login.html"; 
    })
}