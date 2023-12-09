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
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("formContainer").addEventListener("submit", function (event) {
    event.preventDefault();
    addToTask();
  });
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

/**
 * Function to add a subtask, if no subtask is entered, nothing happens
 *
 */
function addSubtask() {
  let subtaskInput = document.getElementById("subtaskInput");
  let subtask = document.getElementById("subtaskList");
  let imagePlus = document.getElementById("subtaskImgPlus");
  let ImageXandAc = document.getElementById("subtaskImg");
  if (subtaskInput.value === ``) {
    return;
  } else {
    subtask.innerHTML += /*html*/ `
    <div id="Subtask${subtaskCount}" class="subtaskItem">
      <div id="contentSubtask${subtaskCount}" class="contentSubtask">
        ${subtaskInput.value}
      </div>
      <div class="subtaskItemImg" id="subtaskItemImg${subtaskCount}">
        <img id="subtaskEdit" onclick="editSubtask(${subtaskCount})"  src="img/Subtask edit.svg">
        <img src="img/Subtask Vect.svg">
        <img id="subtaskDelete" onclick="deleteSubtask(${subtaskCount})" src="img/subtask delete.svg">
      </div>
      <div class="editSubtaskContainer" id="editSubtaskContainer${subtaskCount}" style="display: none;">
        <input type="text" class="subtaskItemEdit" id="subtaskEdit${subtaskCount}" value="${subtaskInput.value}">
        <img class ="editItemImg" src="img/subtask delete.svg" onclick="deleteSubtask(${subtaskCount})">
        <img src="img/Subtask Vect.svg">
        <img class="editItemImg" src="img/Subtasks icon accept.svg" onclick="changeSubtaskItem(${subtaskCount})">
      </div>
    </div>
    `;
    subtaskInput.value = ``;
    subtaskCount++;
  }
  imagePlus.style.display = 'block';
  ImageXandAc.style.display = 'none';
};

/**
 * Function to delete a subtask
 * 
 * @param {number} id - its the subtaskCount of the subtask
 */
function deleteSubtask(id) {
  let subtaskItem = document.getElementById(`Subtask${id}`);
    subtaskItem.remove();
};

/**
 * Function to show the edit subtask container and hide the subtask item
 * 
 * @param {number} id - index of the subtask
 */
function editSubtask(id) {
  let subtaskItem = document.getElementById(`contentSubtask${id}`);
  let subtaskEdit = document.getElementById(`editSubtaskContainer${id}`);
  let subtaskItemImg = document.getElementById(`subtaskItemImg${id}`);
  subtaskEdit.style.display = 'flex';
  subtaskItem.style.display = 'none';
  subtaskItemImg.style.display = 'none';
};

/**
 * Function to clear the subtask Input.
 * 
 */
function clearSubtask() {
  let imagePlus = document.getElementById("subtaskImgPlus");
  let ImageXandAc = document.getElementById("subtaskImg");
  let subtask = document.getElementById("subtaskInput");
  subtask.value = ``;
  imagePlus.style.display = 'block';
  ImageXandAc.style.display = 'none';
};

/**
 * Function to change the subtask item
 * 
 * @param {number} id - index of the subtask 
 */
function changeSubtaskItem(id) {
  let subtaskItem = document.getElementById(`contentSubtask${id}`);
  let subtaskEdit = document.getElementById(`editSubtaskContainer${id}`);
  let subtaskItemImg = document.getElementById(`subtaskItemImg${id}`);
  let subtaskEditInput = document.getElementById(`subtaskEdit${id}`);
  subtaskItem.innerHTML = subtaskEditInput.value;
  subtaskEdit.style.display = 'none';
  subtaskItem.style.display = 'flex';
  subtaskItemImg.style.display = 'flex';
};