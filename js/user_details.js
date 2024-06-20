const getParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get("user_id");
      console.log(param);
    if (!param || param.trim() === "") {
      return;
    }
    return param;
  };
const loadUserDetails = () => {
    const user_id = getParams();
    // console.log(user_id);
    try {
        fetch(`https://shortlisted-iol7.onrender.com/allUser/${user_id}/`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const user_details_box = document.getElementById("user-details");
            const div = document.createElement("div");
            div.classList.add("md:p-20", "p-5")

            div.innerHTML = `
                <div class="bg-[#ADD8FF] overflow-hidden shadow rounded-lg border">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-3xl leading-6 font-medium text-gray-900">
                            User Profile
                        </h3>
                        <p class="mt-3 max-w-2xl text-lg text-gray-500">
                            This is some information about the user.
                        </p>
                    </div>
                    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl class="sm:divide-y sm:divide-gray-200">
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-xl font-medium text-black">
                                    Name
                                </dt>
                                <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    ${data.username}
                                </dd>
                            </div>
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-xl font-medium text-black">
                                    Full name
                                </dt>
                                <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    ${data.first_name} ${data.last_name}
                                </dd>
                            </div>
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-xl font-medium text-black">
                                    Email address
                                </dt>
                                <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    ${data.email}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            `;
            user_details_box.appendChild(div);
        })
    } catch (err) {
        console.log(err.message);
        console.log(err);
    }
}
loadUserDetails();
  getParams();