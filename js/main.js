const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
}) 

const toggler = document.getElementById("toggler");
const sidebar = document.getElementById("sidebar");

toggler.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});