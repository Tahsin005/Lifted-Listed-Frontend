const toggler = document.getElementById("toggler");
const sidebar = document.getElementById("sidebar");

toggler.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});



const loadAccount = () => {
  // alert()
  const user_id = localStorage.getItem('listedandlifted_user_id');
  // console.log(user_id);
  const user_account = localStorage.getItem('listedandlifted_user_account');
  // console.log(user_account);
  try {
      fetch(`https://shortlisted.onrender.com/user/allUser/${user_id}/`)
      .then((response) => response.json())
      .then((user) => {
          // console.log(user);
          try {
              fetch(`https://shortlisted.onrender.com/user/account/${user_account}/`)
              .then((response) => response.json())
              .then((account) => {
                  // console.log(account);
                  const parent = document.getElementById('user-account');
                  const div = document.createElement('div');
                  // div.classList.add("row", "g-0", "align-items-center")
                  div.innerHTML = `
                    <div>
                        <h1 class="text-center text-3xl md:text-5xl font-bold pt-20  md:pt-24">Welcome Admin</h1>
                    </div>

                    <section class="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center">
                        <img class="inline-flex object-cover border-4 border-[#74BBFD] rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-[#74BBFD]/100 bg-indigo-50 text-[#74BBFD] h-24 w-24" src="./assets/images/avatar.jpg" alt="">
                        <h1 class="text-2xl text-black font-bold mt-4">
                          ${user.first_name} ${user.last_name}
                        </h1>
                        <p class="text-3xl mt-5 text-gray-600">@${user.username}</p>
                        <h2 class="text-base md:text-xl text-black font-bold">
                          Email: 
                          <a href="" target=""
                            class="text-indigo-900 hover:text-indigo-600 font-bold border-b-0 hover:border-b-4 hover:border-b-indigo-300 transition-all mb-2">
                            ${user.email}
                          </a>
                        </h2>
                      </section>

                      <div>

                        <div class="flex justify-center gap-x-12">
                          <div class="flex justify-center mt-12">
                            <a href="edit_account.html?id=${user_id}" class="bg-white text-black hover:text-white hover:bg-[#005F86] py-2 px-6 rounded text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                              Edit Profile
                              </a>
                              </div>
                              <div class="flex justify-center mt-12">
                                <a href="change_password.html?id=${user_id}" class="bg-white text-black hover:text-white hover:bg-[#005F86] py-2 px-6 rounded text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                                  Change Password
                              </a>
                            </div>
                      </div>
                      </div>
                  `;
                  parent.appendChild(div);
              })
          } catch (error) {
              
          }
      })
  } catch (err) {
      console.log(err.message);
      console.log(err);
  }
}
loadAccount();