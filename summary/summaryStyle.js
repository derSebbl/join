/**
 * Function to create the navBar and header
 * 
 */
async function includeHTMLSummary() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html"); // "includes/header.html"
      let resp = await fetch(file);
      if (resp.ok) {
          element.innerHTML = await resp.text();
      } else {
          element.innerHTML = 'Page not found';
      }
  }
};

/**
 * Function to change the pen icon, when hovering over the container
 * 
 */
function changePen() {
  let container = document.getElementById("hoverContainer1");
  let image = document.getElementById("pen1");

  container.addEventListener("mouseenter", function () {
    image.src = "./img/summaryPenHover.svg";
  });

  container.addEventListener("mouseover", function () {
    image.src = "./img/summaryPenHover.svg";
  });

  container.addEventListener("mouseout", function () {
    image.src = "./img/summaryPen.png";
  });

  changeToDoColor();
};

/**
 * Function to change the text color, when hovering over the container and leave it
 * 
 */
function changeToDoColor() {
  changeColor("hoverContainer1", ["todoColor1", "todoColor2"]);
};

/**
 * Function to change the check icon, when hovering over the container
 * 
 */
function changeCheck() {
  let container = document.getElementById("hoverContainer2");
  let image = document.getElementById("check1");

  container.addEventListener("mouseenter", function () {
    image.src = "./img/summaryCheckHover.svg";
  });

  container.addEventListener("mouseover", function () {
    image.src = "./img/summaryCheckHover.svg";
  });

  container.addEventListener("mouseout", function () {
    image.src = "./img/summaryCheck.png";
  });

  changeDoneColor();
};

/**
 * Function to change the text color, when hovering over the container Done and leave it
 * 
 */
function changeDoneColor() {
  changeColor("hoverContainer2", ["doneColor1", "doneColor2"]);
};

/**
 * Function to change the urgent text, when hovering over the container
 * 
 */
function changeUrgent() {
  changeColor("summaryContentMiddle", ["urgentColor1", "urgentColor2", "urgentColor3", "urgentColor4"]);
  };

/**
 * Function to change the text color, when hovering over the container Tasks in Board
 * 
 */
function changeTask1() {
  changeColor("hoverContainer4", ["taskColor1", "taskColor2"]);
};

/**
 * Function to change the text color, when hovering over the container Tasks in Progress
 * 
 */
function changeTask2() {
  changeColor("hoverContainer5", ["taskColor3", "taskColor4"]);
};

/**
 * Function to change the text color, when hovering over the container Awaiting Feedback
 * 
 */
function changeTask3() {
  changeColor("hoverContainer6", ["taskColor5", "taskColor6"]);
};

/**
 * Fuction to change the text color, when hovering over the container and leave it
 * 
 * @param {string} containerId - id of the container to hover over 
 * @param {string} textIds - ids of the text to change color
 */
function changeColor(containerId, textIds) {
  let container = document.getElementById(containerId);

  const handleEvent = (event, action) => {
    textIds.forEach(function(textId) {
      let text = document.getElementById(textId);
      text.classList[action]("changeColor");
    });
  };

  container.addEventListener("mouseenter", () => handleEvent("mouseenter", "add"));
  container.addEventListener("mouseover", () => handleEvent("mouseover", "add"));
  container.addEventListener("mouseout", () => handleEvent("mouseout", "remove"));
};