const token = localStorage.getItem("listedandlifted_token");
if (!token) {
    window.location.href = "login.html";
}

const loadCategories = async () => {
    try {
        const response = await fetch("https://shortlisted-iol7.onrender.com/product/category/")
        const category = await response.json();
        // console.log(category);
        category.forEach((item) => {
            // console.log(item.slug);
            const parent = document.getElementById('categories')
            const option = document.createElement("option")
            option.classList.add("dropdown-item")
            option.value = item?.id 
            option.innerHTML = item?.name
            parent.appendChild(option)
        })
    } catch (err) {
        console.log(err);
    }
}
const addProduct = (event) => {
    event.preventDefault();
    if (!token) { 
        window.location.href = "login.html";
    }
    const name = getValue("name")
    const description = getValue("description")
    const image = document.getElementById("image").value;
    const price = parseInt(getValue("price"))
    const bought_by = ''
    const added_by = parseInt(localStorage.getItem('listedandlifted_user_id'))
    const categories = parseInt(getValue("categories"))
    console.log(name, description, image, price, bought_by, added_by, categories)
    console.log("cat", categories);
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("price", price);
        formData.append("bought_by", bought_by);
        formData.append("added_by", added_by);
        formData.append("categories", categories);
        console.log(formData);
        for (var key in formData) {
            console.log(key, formData[key]);
        }
        fetch("https://shortlisted-iol7.onrender.com/product/list/", {
            method: "POST",
            body: formData
        })
        .then((response) => {
            if (response.ok) {
                alert("Product have beed listed successfully")
                window.location.href = "products.html";
                // console.log("Done and dusted");
            } else {
               console.log("Invalid formation");
            }
        })
        .catch(error => {
            console.error("Error adding pet:", error);
        })
    } catch (err) {
        console.log(err);
    }
}
loadCategories();