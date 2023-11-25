// Codeblock zum laden der Templates
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
}

// Ändert Icon, bei hovern über den Container
function changePen() {
  let container = document.getElementById("hoverContainer1");
  let image = document.getElementById("pen1");

  // Ändert das Bild, wenn der Mauszeiger über den Container hovert
  container.addEventListener("mouseover", function () {
    image.src = "./img/summaryPenHover.svg";
  });

  // Setzt das Bild zurück, wenn der Mauszeiger den Container verlässt
  container.addEventListener("mouseout", function () {
    image.src = "./img/summaryPen.png";
  });

  changeToDoColor();
}

//Ändert Textfarbe
function changeToDoColor() {
  let container = document.getElementById("hoverContainer1");
  let h3Color = document.getElementById("todoColor1");
  let h4Color = document.getElementById("todoColor2");

  // Ändert Textfarbe in weiß
  container.addEventListener("mouseover", function () {
    h3Color.classList.add("changeColor");
    h4Color.classList.add("changeColor");
  });

  //setzt Textfarbe wieder zurück
  container.addEventListener("mouseout", function () {
    h3Color.classList.remove("changeColor");
    h4Color.classList.remove("changeColor");
  });
}


// Ändert Icon, bei hovern über den Container
function changeCheck() {
  let container = document.getElementById("hoverContainer2");
  let image = document.getElementById("check1");

  // Ändert das Bild, wenn der Mauszeiger über den Container hovert
  container.addEventListener("mouseover", function () {
    image.src = "./img/summaryCheckHover.svg";
  });

  // Setzt das Bild zurück, wenn der Mauszeiger den Container verlässt
  container.addEventListener("mouseout", function () {
    image.src = "./img/summaryCheck.png";
  });

  changeDoneColor();
}

//Ändert Textfarbe
function changeDoneColor() {
  let container = document.getElementById("hoverContainer2");
  let h3Color = document.getElementById("doneColor1");
  let h4Color = document.getElementById("doneColor2");

  // Ändert Textfarbe in weiß
  container.addEventListener("mouseover", function () {
    h3Color.classList.add("changeColor");
    h4Color.classList.add("changeColor");
  });

  //setzt Textfarbe wieder zurück
  container.addEventListener("mouseout", function () {
    h3Color.classList.remove("changeColor");
    h4Color.classList.remove("changeColor");
  });
}


//Ändert Textfarbe
function changeUrgent() {
    let container = document.getElementById("summaryContentMiddle");
    let text1 = document.getElementById("urgentColor1");
    let text2 = document.getElementById("urgentColor2");
    let text3 = document.getElementById("urgentColor3");
    let text4 = document.getElementById("urgentColor4");
    
    
    // Ändert Textfarbe in weiß
    container.addEventListener("mouseover", function () {
      text1.classList.add("changeColor");
      text2.classList.add("changeColor");
      text3.classList.add("changeColor");
      text4.classList.add("changeColor");
    });
  
    //setzt Textfarbe wieder zurück
    container.addEventListener("mouseout", function () {
      text1.classList.remove("changeColor");
      text2.classList.remove("changeColor");
      text3.classList.remove("changeColor");
      text4.classList.remove("changeColor");
    });
  }

//Ändert Textfarbe
function changeTask1() {
    let container = document.getElementById("hoverContainer4");
    let text1 = document.getElementById("taskColor1");
    let text2 = document.getElementById("taskColor2");    
    
    // Ändert Textfarbe in weiß
    container.addEventListener("mouseover", function () {
      text1.classList.add("changeColor");
      text2.classList.add("changeColor");
    });
  
    //setzt Textfarbe wieder zurück
    container.addEventListener("mouseout", function () {
      text1.classList.remove("changeColor");
      text2.classList.remove("changeColor");
  })
}

//Ändert Textfarbe
function changeTask2() {
    let container = document.getElementById("hoverContainer5");
    let text1 = document.getElementById("taskColor3");
    let text2 = document.getElementById("taskColor4");    
    
    // Ändert Textfarbe in weiß
    container.addEventListener("mouseover", function () {
      text1.classList.add("changeColor");
      text2.classList.add("changeColor");
    });
  
    //setzt Textfarbe wieder zurück
    container.addEventListener("mouseout", function () {
      text1.classList.remove("changeColor");
      text2.classList.remove("changeColor");
  })
}

//Ändert Textfarbe
function changeTask3() {
    let container = document.getElementById("hoverContainer6");
    let text1 = document.getElementById("taskColor5");
    let text2 = document.getElementById("taskColor6");    
    
    // Ändert Textfarbe in weiß
    container.addEventListener("mouseover", function () {
      text1.classList.add("changeColor");
      text2.classList.add("changeColor");
    });
  
    //setzt Textfarbe wieder zurück
    container.addEventListener("mouseout", function () {
      text1.classList.remove("changeColor");
      text2.classList.remove("changeColor");
  })
}