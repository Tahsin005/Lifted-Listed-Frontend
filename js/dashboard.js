const toggler = document.getElementById("toggler");
const sidebar = document.getElementById("sidebar");

toggler.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});