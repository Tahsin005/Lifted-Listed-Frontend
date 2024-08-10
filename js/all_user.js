
const loadAlluser = () => {
    const all_user_box = document.getElementById("all-users");
    try {
        fetch("https://lifted-listed-backend.onrender.com/user/allUser/")
        .then((res) => res.json())
        .then((user) => {
            console.log(user);
            user.forEach((item) => {
                console.log(item);
                if (item.username != "admin") {
                    const li = document.createElement("li");
                    li.classList.add("pb-3", "sm:pb-4");
                    li.innerHTML = `
                        
                        <div class="flex items-center space-x-4 rtl:space-x-reverse">
                            
                            <div class="flex-1 min-w-0">
                                <p class="text-3xl font-medium text-gray-900 truncate dark:text-black">
                                ${item.username}
                                </p>
                                <p class="text-lg mt-3 text-black truncate dark:text-black">
                                ${item.email}
                                </p>
                            </div>
                            <a href="user_details.html?user_id=${item.id}" class="btn inline-flex text-xl items-center font-semibold bg-[#74BBFD] text-gray-900">
                                Details
                            </a>
                        </div>
    
                    `
                    all_user_box.appendChild(li);
                }
            })
        })
    } catch (e) {
        console.log(e.message);
    }
}
loadAlluser();