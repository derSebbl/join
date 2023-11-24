/**
 * Eventlistener who checks if the window is resized and if it to small it calls the function switchParent.
 * 
 */
window.addEventListener("resize", switchParent);

/**
 * Function to switch the Parent Div from prio and assigned. Need to sort the Elements in the right Order in Responsiv.
 * 
 */
function switchParent() {
  let formLeft = document.getElementById("formLeft");
  let formRight = document.getElementById("formRight");
  let prio = document.getElementById("prio");
  let assigned = document.getElementById("assigned");

  if (window.innerWidth <= 1300) {
    formLeft.appendChild(prio);
    formRight.appendChild(assigned);
  } else {
    formLeft.appendChild(assigned);
    formRight.appendChild(prio);
  }
};

/**
 * Eventlistener to change the pictures of the subtask input field
 * 
 */
document.addEventListener('DOMContentLoaded', function() {
  let inputField = document.getElementById("subtaskInput");
  let imagePlus = document.getElementById("subtaskImgPlus");
  let ImageXandAc = document.getElementById("subtaskImg");

  inputField.addEventListener('input', function() {
    if (inputField.value !== '') {
      imagePlus.style.display = 'none';
      ImageXandAc.style.display = 'flex';
    } else {
      imagePlus.style.display = 'block';
      ImageXandAc.style.display = 'none';
    }
  });
});

/**
 * Function to prevent the reloading of the page when the form is submitted
 *
 */
document.getElementById("formContainer").addEventListener("submit", function (event) {
    event.preventDefault();
    addToTask();
  });

/**
 * Function to add an event listener to the checkbox to change the background color and the color of the label and push the selected contacts to the Div to show the selected badges
 * 
 */
function addEventListenerToCheckbox(checkbox, label, assignedToInput) {
  checkbox.addEventListener("change", function () {
    updateSelectedContacts(assignedToInput, label, checkbox);
  });
};