const sidebar = document.getElementById("sidebar");
const toggleBtn = document.querySelectorAll(".dropdown-btn");

function toggleDropdown(element) {
    element.nextElementSibling.classList.toggle("show");
    element.classList.toggle("rotate");
    sidebar.classList.remove("close")
}

function toggleSidebar() {
    sidebar.classList.toggle("close");
    toggleBtn.forEach(btn => 
        {btn.nextElementSibling.classList.remove("show");
         btn.classList.remove("rotate");
        }

    );
}