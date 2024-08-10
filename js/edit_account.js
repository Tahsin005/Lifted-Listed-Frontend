const user_id = localStorage.getItem('listedandlifted_user_id');
const user_account = localStorage.getItem('listedandlifted_user_account');
console.log(user_id);
console.log(user_account);


if (user_account && user_id) {
    const loadInstance = () => {
        try {
            fetch(`https://lifted-listed-backend.onrender.com/user/allUser/${user_id}/`)
                .then((res) => res.json())
                .then((user) => {
                    // console.log(user)
                    document.getElementById('first_name').value = user.first_name
                    document.getElementById('last_name').value = user.last_name
                    document.getElementById('email').value = user.email
                    try {
                        fetch(`https://lifted-listed-backend.onrender.com/user/account/${user_account}/`)
                            .then((response) => response.json())
                            .then((account) => {
                                console.log(account);
                            })
                    } catch (error) {
                        console.log(error)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    loadInstance();
}


const editAccount = async (event) => {
    event.preventDefault();

    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    try {
        const response = await fetch(`https://lifted-listed-backend.onrender.com/user/update/${user_id}/`, {
            method: 'PATCH',
            body: formData,
        });
        const data = await response.json();
        // console.log('Account updated:', data);
        alert("Account updated successfully")
        window.location.href = "dashboard.html";
    } catch (error) {
        console.log('Error updating account:', error);
    }
};
