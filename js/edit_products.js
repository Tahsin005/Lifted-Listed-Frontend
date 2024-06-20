const getParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get("id");
  if (!param || param.trim() === "") {
    return;
  }
  return param;
};
const loadInstance = async () => {
  const token = localStorage.getItem("listedandlifted_token");
  if (!token) {
    window.location.href = "dashboard.html";
  }
  const id = getParams();
  console.log(id);
  // staring here ...
  try {
    const response = await fetch(
      `https://shortlisted-iol7.onrender.com/product/list/${id}/`
    );
    const product = await response.json();
    let cat;
    const loadCategory = async () => {
      try {
        fetch("https://shortlisted-iol7.onrender.com/product/category/")
          .then((res) => res.json())
          .then((category) => {
            category.forEach((item) => {
              if (product.categories[0] == item.id) {
                try {
                  fetch(
                    `https://shortlisted-iol7.onrender.com/product/list/${product.id}/`
                  )
                    .then((res) => res.json())
                    .then((user) => {
                      // console.log(user)
                      document.getElementById("name").value = product.name;
                      document.getElementById("image").value = product.image;
                      document.getElementById("description").value =
                        product.description;
                      document.getElementById("price").value = product.price;

                      const parent = document.getElementById("categories");
                      const option = document.createElement("option");
                      option.classList.add("dropdown-item");
                      option.value = item?.id;
                      option.innerHTML = item?.name;
                      option.selected = true;
                      parent.appendChild(option);
                    });
                } catch (error) {
                  console.log(error);
                }

                const proname = document.getElementById("name").value;
                const proimage = document.getElementById("image").value;
                const prodescription =
                  document.getElementById("description").value;
                const proprice = document.getElementById("price").value;
              } else {
                const parent = document.getElementById("categories");
                const option = document.createElement("option");
                option.classList.add("dropdown-item");
                option.value = item?.id;
                option.innerHTML = item?.name;
                parent.appendChild(option);
              }
            });
          });
      } catch (err) {
        console.log(err.message);
        console.log(err);
      }
    };
    loadCategory();
  } catch (err) {
    console.log(err.message);
    console.log(err);
  }
};
const handleProductDetails = async () => {
  const token = localStorage.getItem("listedandlifted_token");
  if (!token) {
    window.location.href = "dashboard.html";
  }
  const id = getParams();
  // staring here ...
  try {
    const response = await fetch(
      `https://shortlisted-iol7.onrender.com/product/list/${id}/`
    );
    const product = await response.json();
    let cat;
    const loadCategory = async () => {
      try {
        fetch("https://shortlisted-iol7.onrender.com/product/category/")
          .then((res) => res.json())
          .then((category) => {
            category.forEach((item) => {
              if (product.categories[0] == item.id) {
                const proname = document.getElementById("name").value;
                const proimage = document.getElementById("image").value;
                const prodescription = document.getElementById("description").value;
                const proprice = document.getElementById("price").value;
                const procategories = parseInt(getValue("categories"));

                const updateDproduct = {
                  id: product.id,
                  name: document.getElementById("name").value,
                  categories: [procategories],
                  image: document.getElementById("image").value,
                  description: document.getElementById("description").value,
                  price: document.getElementById("price").value,
                  added_by: product.added_by,
                  bought_by: product.bought_by,
                };
                // console.log(updateDproduct);

                try {
                  fetch(
                    `https://shortlisted-iol7.onrender.com/product/list/${product.id}/`,
                    {
                      method: "PATCH",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify(updateDproduct),
                    }
                  ).then((response) => {
                    if (response.status === 200) {
                      alert("Product details updated successfully");
                      window.location.href = "products.html";
                    } else {
                      console.log(
                        "Poduct details update failed status code:",
                        response.status
                      );
                    }
                  });
                } catch (error) {
                  console.log(error);
                }
              }
            });
          });
      } catch (err) {
        console.log(err.message);
        console.log(err);
      }
    };
    loadCategory();
  } catch (err) {
    console.log(err.message);
    console.log(err);
  }
};
function deleteProduct() {
  const product_id = getParams();
  const url = `https://shortlisted-iol7.onrender.com/product/list/${product_id}/`;

  fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("Product deleted successfully");
        window.location.href = "my_listing.html";
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

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
loadInstance();
