const token = localStorage.getItem("listedandlifted_token");
if (!token) {
    window.location.href = "login.html";
}
const handleDeposit = (event) => {
    event.preventDefault();
    const amnt = document.getElementById("amount").value;
    const amount = parseInt(amnt)
    const acnt = localStorage.getItem("listedandlifted_user_account")
    const account = parseInt(acnt)
    console.log(amount, account);
    if ((typeof amount === 'number') && (typeof account === 'number')) {
        console.log("Yes it is a number");
        try {
            var res;
            fetch('https://shortlisted-iol7.onrender.com/transaction/deposit/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, account })
            })
            .then((response) => {
                response.json();
            })
            .then((data) => {
                alert(`You Have Successfully Deposited ${amount}$`)
                window.location.href = "dashboard.html"
            })

        } catch (error) {
            
        }
    } else {
        console.log("Invalid input");
    }
}