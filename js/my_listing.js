const getId = localStorage.getItem('listedandlifted_user_id');
if (getId) {
    // console.log("User id : ");
    // console.log(getId);
    // window.location.href = "index.html";
}
const loadCategories = async () => {
    try {
        const response = await fetch("https://lifted-listed-backend.onrender.com/product/category/")
        const category = await response.json();
        category.forEach((item) => {
            // console.log(item.slug);
            loadproductByCategory(item.slug)

        })
    } catch (err) {
        console.log(err);
    }
}

const loadproductByCategory = async (slug = null) => {
    try {
        const response = await fetch(`https://lifted-listed-backend.onrender.com/product/list/?categories__slug=${slug? slug : ""}`);
        const data = await response.json();
        // console.log(data);
        if (data.length > 0) {
            displayproductByCategory(data);
        }
    } catch {

    }
}

const displayproductByCategory = (data) => {
    console.log("Data : ", data);
    let myArray = [];
    data.forEach((product) => {
        if(product.added_by['id'] == getId) {
            myArray.push(product)
            let cat;
            const loadCategory = () => {
                try {
                    fetch("https://lifted-listed-backend.onrender.com/product/category/")
                        .then(res => res.json())
                        .then(category => {
                            // console.log(category)
                            category.forEach((item) => {
                                if (product.categories[0]['id'] == item.id) {
                                    // console.log(item)
                                    cat = item.name
                                    const parent = document.getElementById("product-list-cards")
                                    const div = document.createElement("div")
                                    div.innerHTML =
                                        `
                                       <div class="card  bg-[#ADD8FF] shadow-xl h-full">
                                <figure>
                                    <img
                                    src="${product.image}"
                                    alt="product image"
                                    />
                                </figure>
                                <div class="card-body">
                                    <h2 class="card-title md:text-2xl">
                                    ${product.name}
                                    </h2>
                                    <div>
                                        <h2 class="">${cat}</h2>
                                    </div>
                                    <h2 class="text-md font-semibold">Price: <span>${
                                      product.price == 0
                                        ? "Free"
                                        : product.price
                                    }</span>$</h2>
                                    <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing
                                    </p>
                                    <div class="card-actions justify-center mt-4">
                                    <a href="product_details.html?id=${
                                      product.id
                                    }" class="bg-[#005F86] text-white text-center hover:text-black hover:bg-white py-2 px-6 rounded text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-full">
                                        Details
                                    </a>
                                    </div>
                                </div>
                            </div>

                                    `
                                    parent.appendChild(div)
                                }
                            })
                        })
                } catch (err) {
                    console.log(err.message);
                    console.log(err);
                }
            }
            loadCategory();
            // alert()
        }
        else {
            // alert()
            // document.getElementById('product-list-cards').innerHTML = "";
            // document.getElementById("cards-nodata").style.display = "none"
        }
    })

    if (myArray.length > 0 ){
        // alert("YEET")
        document.getElementById("no-data").style.display = "none"
    } else {
        document.getElementById("cards-nodata").style.display = "block"
    }
}
loadCategories();
loadproductByCategory();