let pages = [
    { id: "summaryMenu", url: "/summary/summary.html" },
    { id: "addTaskMenu", url: "/addTask/addTask.html" },
    { id: "boardMenu", url: "/board/board.html" },
    { id: "contactMenu", url: "/contact/contact.html" },
];

let checkExist = setInterval(function () {
    for (var i = 0; i < pages.length; i++) {
        let page = pages[i];
        let element = document.getElementById(page.id);
        if (element && window.location.href.endsWith(page.url)) {
            element.className = "";
            element.classList.add("active");
        } else if (element) {
            element.className = "";
        }
    }
    setTimeout(() => {
      clearInterval(checkExist);
    }, 500);
}, 20);


function toSummary() {
  window.location.href = "/summary/summary.html";
}

function toAddTask() {
  window.location.href = "/addTask/addTask.html";
}

function toBoard() {
  window.location.href = "/board/board.html";
}

function toContact() {
  window.location.href = "/contact/contact.html";
}

function toPrivacyPolicy() {
  window.open("../privacyPolicy.html", "_blank");
}

function toLegalNotice() {
  window.open("../legalNotice.html", "_blank");
}

let closeMenuOnClickOutsideBound;

function closeMenuOnClickOutside(miniMenu, event) {
  if (!miniMenu.contains(event.target)) {
    miniMenu.style.display = "none";
    document.removeEventListener("click", closeMenuOnClickOutsideBound);
  }
}

function openMiniMenu() {
  let miniMenu = document.getElementById("minimenu");
  if (miniMenu.style.display === "none") {
    miniMenu.style.display = "inline-flex";
    closeMenuOnClickOutsideBound = closeMenuOnClickOutside.bind(null, miniMenu);
    setTimeout(() => {
      document.addEventListener("click", closeMenuOnClickOutsideBound);
    }, 0);
  } else {
    miniMenu.style.display = "none";
    document.removeEventListener("click", closeMenuOnClickOutsideBound);
  }
}

function goBack() {
  window.close();
}
