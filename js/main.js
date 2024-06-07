const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
}) 

const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};