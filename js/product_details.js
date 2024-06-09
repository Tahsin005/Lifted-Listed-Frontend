const getParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get("id");
  //   console.log(param);
  if (!param || param.trim() === "") {
    return;
  }
  return param;
};
const buyProduct = (event) => {
  event.preventDefault();
  const token = localStorage.getItem("listedandlifted_token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }
  const product_id = getParams();
  const user_id = localStorage.getItem("listedandlifted_user_id");
  const listedandlifted_user_account = localStorage.getItem(
    "listedandlifted_user_account"
  );
  //   console.log("user_id", user_id);
  const loadBalance = () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://shortlisted.onrender.com/user/account/${listedandlifted_user_account}/`
      )
        .then((response) => response.json())
        .then((data) => {
          //   console.log(data);
          let balance = data.balance;
          //   console.log("User balance: " + balance);
          fetch(`https://shortlisted.onrender.com/product/list/${product_id}/`)
            .then((res) => res.json())
            .then((prodata) => {
              let pro_price = prodata.price;
              //   console.log("Product price: " + pro_price);
              if (pro_price > balance) {
                alert("Not enough money to buy this product.");
                window.location.href = "deposit.html";
                reject("Not enough balance");
              } else {
                resolve();
              }
            });
        })
        .catch((error) => {
          console.error("Error in loadBalance:", error);
          reject(error);
        });
    });
  };

  loadBalance().then(() => {
    fetch(`https://shortlisted.onrender.com/product/buy/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ product_id, user_id }),
    })
      .then((response) => {
        if (response.status == 200) {
          alert("Product bought successfully");
          window.location.href = "dashboard.html";
        } else {
          console.log("Error buying product");
        }
      })
      .catch((error) => {
        console.error("Error buying product", error);
      });
  });
};

const addReview = (event) => {
  event.preventDefault();
  const token = localStorage.getItem("listedandlifted_token");
  if (!token) {
    window.location.href = "dashboard.html";
  }
  const body = document.getElementById("description").value;
  const product = getParams();
  const user = localStorage.getItem("listedandlifted_user_id");
  //   console.log(body);
  //   console.log(product);
  //   console.log(user);
  try {
    const formData = new FormData();
    formData.append("body", body);
    formData.append("product", product);
    formData.append("user", user);
    console.log(formData);
    fetch(`https://shortlisted.onrender.com/product/review/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "products.html";
          // console.log("Done and dusted");
        } else {
          console.log("Error while reviewing");
        }
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
  } catch (error) {
    console.log(error);
  }
};
const reviewerDetails = async (user_id) => {
  try {
    const response = await fetch(
      `https://shortlisted.onrender.com/user/allUser/${user_id}/`
    );
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const productDetailsHandler = async () => {
  const token = localStorage.getItem("listedandlifted_token");
  if (!token) {
    window.location.href = "login.html";
  }
  const id = getParams();
  //   console.log(id);
  // staring here ...
  try {
    const response = await fetch(
      `https://shortlisted.onrender.com/product/list/${id}/`
    );
    const product = await response.json();
    // console.log(product.bought_by);
    // console.log("Product id ---- ", product.id);
    const uid = localStorage.getItem("listedandlifted_user_id");
    // console.log("User er id: ", uid);

    let cat;
    const review = await fetch(
      `https://shortlisted.onrender.com/product/review/?product__id=${id}`
    );
    const reviews = await review.json();
    const loadCategory = async () => {
      try {
        fetch("https://shortlisted.onrender.com/product/category/")
          .then((res) => res.json())
          .then((category) => {
            category.forEach((item) => {
              if (product.categories[0] == item.id) {
                cat = item.name;
                const parent = document.getElementById("product-details-card");
                const div = document.createElement("div");
                div.innerHTML = `
                                    <div class="bg-[#74BBFD] py-8 rounded-lg">
                                        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                            <div class="flex flex-col md:flex-row -mx-4">
                                                <div class="md:flex-1 px-4">
                                                    <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                                        <img class="w-full h-full object-cover" src="${
                                                          product.image
                                                        }" alt="Product Image">
                                                    </div>
                                                    <div class="flex -mx-2 mb-4">
                                                        <div class="w-1/2 px-2">
                                                            ${
                                                              product.bought_by !=
                                                              null
                                                                ? `
                                                                <button class="bg-red-700 text-white text-center  py-2 px-6 rounded text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-full">Sold Out</button>
                                                                
                                                                `
                                                                : `
                                                                <button onclick="buyProduct(event)" class="bg-[#005F86] text-white text-center hover:text-black hover:bg-white py-2 px-6 rounded text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-full">Buy Now!</button>
                                                                `
                                                            }
                                                        </div>
                                                        ${
                                                          product.added_by ==
                                                          uid
                                                            ? `
                                                            <a href="edit_products.html?id=${product.id}" class="w-1/2 px-2">
                                                            <button  class="bg-[#005F86] text-white text-center hover:text-black hover:bg-white py-2 px-6 rounded text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-full">Edit Product</button>
                                                        </a>
                                                            `
                                                            : ``
                                                        }
                                                    </div>
                                                </div>
                                                <div class="md:flex-1 px-4">
                                                    <h2 class="text-3xl font-bold text-black  mb-2">${
                                                      product.name
                                                    }</h2>
                                                    <div class="badge badge-primary text-xl my-5 p-4">${cat}</div>
                                                    
                                                    <div class="flex mb-4">
                                                        <div class="mr-4">
                                                            <span class="font-bold text-black text-xl">Price:</span>
                                                            <span class="text-black text-xl">${
                                                              product.price == 0
                                                                ? `Free`
                                                                : product.price
                                                            }</span>
                                                        </div>
                                                    </div>
                                                
                                                    
                                                    <div>
                                                        <span class="font-bold text-black text-2xl">Product Description:</span>
                                                        <p class="text-black  text-sm mt-2">
                                                        ${product.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
  
  
                                  ${
                                    product.bought_by != null &&
                                    isAuthenticated() &&
                                    product.bought_by ==
                                      localStorage.getItem(
                                        "listedandlifted_user_id"
                                      ) &&
                                    reviews.length != 1
                                      ? `
                                  <div class="my-3 rounded-xl">
                                    <div class=" rounded-xl">
                                        <div class="bg-[#005F86] p-4">
                                            <h3 class="text-lg font-semibold text-white">Add Review</h3>
                                        </div>
                                        <div class="bg-white p-4">
                                            <form method="post">
                                                <div class="mb-4">
                                                    <label for="description" class="block text-2xl font-medium text-black">Description</label>
                                                    <textarea class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" id="description" name="description" rows="3" required></textarea>
                                                </div>

                                                <div href="" class="w-1/2 px-2">
                                                    <a onclick="addReview(event)" class="bg-[#005F86] text-white text-center hover:text-black hover:bg-white py-2 px-6 rounded text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-full">Add Review</a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                  </div>
                                  `
                                      : ``
                                  }
  
  
                                  <div class="my-3 rounded-xl" id="reviews-box">
                                      <div class="bg-[#74BBFD] p-4">
                                        <h3 class="text-lg font-semibold text-black">Reviews: ${
                                          reviews.length
                                        }</h3>
                                      </div>
                                  </div>
                                      `;
                parent.appendChild(div);
                const reviewsParent = document.getElementById("reviews-box");
                reviews.forEach(async (rev) => {
                  const userData = await reviewerDetails(rev.user);
                  console.log(userData);
                  const reviewCard = document.createElement("div");
                  reviewCard.classList.add("card", "mb-1");
                  reviewCard.innerHTML = `
                                        <div class="my-3 rounded-xl">
                                            <div class=" rounded-xl">
                                                <figure class="md:flex max-w-5xl pt-12  rounded-xl md:p-0 bg-[#74BBFD]">
                                                <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full bg-yellow-300 mx-auto object-cover" src="./assets/images/avatar.jpg" alt="" width="384" height="512">
                                                <div class="p-8  md:p-8 text-center md:text-left space-y-4">
                                                    <blockquote>
                                                    <p class="text-lg font-medium text-black">
                                                        "${rev.body}"
                                                    </p>
                                                    </blockquote>
                                                    <figcaption class="font-medium">
                                                    <div class="text-black">
                                                        ${userData.username}
                                                    </div>
                                                    <div class="text-black">
                                                        ${formattedDate(
                                                          rev.created_on
                                                        )}
                                                    </div>
                                                    </figcaption>
                                                </div>
                                                </figure>
                                            </div>
                                        </div>
  
                                  `;
                  reviewsParent.appendChild(reviewCard);
                });
              }
            });
          });
      } catch (err) {
        console.log(err.message);
        console.log(err);
      }
    };
    loadCategory();
    // console.log(pet)
  } catch (err) {
    console.log(err.message);
    console.log(err);
  }
};
const formattedDate = (isoString) => {
  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return date.toLocaleString("en-US", options);
};
productDetailsHandler();
