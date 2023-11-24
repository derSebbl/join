/**
 * init function to load the registered users and the addTask.html
 *
 */
async function initAddTask() {
  switchParent();
  await loadRegisteredUsers();
  editAssignedToList();
  editCategoryList();
};

/**
 * Function to push the new Task to the array and to the local storage
 *
 */
function addToTask() {
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let assignedTo = document.getElementById("assignedToInput");
  let date = document.getElementById("date");
  let prio = document.getElementById("selectedPriority");
  let category = document.getElementById("category");
  let subtask = document.getElementById("subtaskList");

  let newTask = {
    title: title.value,
    description: description.value,
    assignedTo: assignedTo.value,
    duedate: date.value,
    priority: prio.value,
    cardlabel: category.value,
    subtasks: subtask.innerText,
  };
  tasks.push(newTask);
  pushIntoTasksData(newTask);
  clearValues();
};

/**
 * Function to clear all values
 *
 */
function clearValues() {
  clearFormContainer();
  uncheckCheckbox();
  clearAssignedSelected();
  clearSelectedPriority();
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
    <div class="subtaskItem">${subtaskInput.value}</div>
    `;
    subtaskInput.value = ``;
  }
  imagePlus.style.display = 'block';
  ImageXandAc.style.display = 'none';
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
 * Function to create a checkbox for the registered users on the AssignedTo Input
 *
 * @param {number} - its the index of the arrayOfRegisteredUsers
 * @param {string} - the usernames of the registered users
 * @returns
 */
function createCheckbox(i, contact) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "contact";
  checkbox.value = i;
  checkbox.dataset.id = i;
  checkbox.dataset.initials = getInitials(contact);
  return checkbox;
};

/**
 * Function to create a div for the User Badges at the assignedTo Label
 *
 * @param {number} i - its the index of the arrayOfRegisteredUsers
 * @returns
 */
function createBadgetDiv(i) {
  let badgetDiv = document.createElement("div");
  badgetDiv.id = `designProfileBadgeInner-${i}`;
  badgetDiv.className = "designAssignedBadgeInner";
  return badgetDiv;
};

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
 * Function to get the selected contacts if they are checked in the checkbox
 *
 */
function getSelectedContacts() {
  let selectedContacts = document.querySelectorAll(
    'input[name="contact"]:checked'
  );
  return Array.from(selectedContacts).map((contact) => contact.value);
};

/**
 *Function to update the assignedTo Input and the label of the checkbox and to change the background color and the color of the label
 * 
 */
function updateInputAndLabel(assignedToInput, label, checkbox, selectedNames) {
  assignedToInput.value = cleanJSONString(selectedNames);
  label.style.backgroundColor = checkbox.checked ? "#2A3647" : "";
  label.style.color = checkbox.checked ? "white" : "";
};

/**
 * Function that add initials and the value of the checked Contact and create the Badge in the assignedSelectedDiv. If the checkbox is unchecked, the badge will be removed
 *
 * @param {Element} checkbox - the checkbox that is checked
 * @param {Element} assignedSelectedDiv - the div where the selected badges are shown
 */
function updateAssignedSelectedDiv(checkbox, assignedSelectedDiv) {
  let id = checkbox.dataset.id;
  let badgeId = `designProfileBadgeInner-${id}`;
  let initials = checkbox.dataset.initials;
  let selectedBadge = document.createElement("div");
  selectedBadge.id = badgeId;
  selectedBadge.className = "designAssignedBadgeInner";
  selectedBadge.classList.add(id);
  selectedBadge.innerHTML = initials;

  if (checkbox.checked) {
    assignedSelectedDiv.appendChild(selectedBadge);
    console.log(badgeId);
  } else {
    let badgeToRemove = document.getElementsByClassName(id)[0];
    badgeToRemove.remove();
  }
}

/**
 * Function to update the selected contacts and the assignedSelectedDiv
 *
 * @param {Element} assignedToInput - the input where the selected contacts are shown
 * @param {Element} label - the label of the checkbox
 * @param {Element} checkbox - the checkbox that is checked
 */
function updateSelectedContacts(assignedToInput, label, checkbox) {
  let selectedNames = getSelectedContacts();
  updateInputAndLabel(assignedToInput, label, checkbox, selectedNames);

  let assignedSelectedDiv = document.querySelector("#assignedSelected");
  updateAssignedSelectedDiv(checkbox, assignedSelectedDiv);
};

/**
 * Function to create the label for the registered users in the AssignedTo Input. It also creates the checkbox, the div vor the username and the div for the initials
 *
 * @param {string} contact - the username of the registered user
 * @param {number} i - its the index of the arrayOfRegisteredUsers
 * @returns
 */
function createLabel(contact, i) {
  let checkbox = createCheckbox(i, contact);
  let additionalDiv = createBadgetDiv(i);
  let nameDiv = createNameDiv(contact);
  let initialDiv = createInitialsDiv(contact);
  additionalDiv.appendChild(initialDiv);
  let label = document.createElement("label");

  label.appendChild(additionalDiv);
  label.appendChild(nameDiv);
  label.appendChild(checkbox);

  addEventListenerToCheckbox(checkbox, label, assignedToInput);

  return label;
};

/**
 * Function to edit the AssignedTo Input with the registered users
 *
 */
function editAssignedToList() {
  let container = document.getElementById("checkbox");

  for (let i = 0; i < arrayOfRegisteredUsers.length; i++) {
    let contact = arrayOfRegisteredUsers[i]["username"];
    let label = createLabel(contact, i);
    container.appendChild(label);
  }
};

/**
 * Function to create the div and the initials of the registered users
 *
 * @param {string} name - the username of the registered user
 * @returns
 */
function createInitialsDiv(name) {
  let initials = getInitials(name);
  let initialsDiv = document.createElement("div");
  initialsDiv.appendChild(document.createTextNode(initials));
  initialsDiv.id = "initialsDiv";
  return initialsDiv;
};

/**
 * Function that extract the 2 first letters of the first and the last name of the registered user. If a User got only one name it takes the first 2 letters of the name
 *
 * @param {string} name - the username of the registered user
 * @returns
 */
function getInitials(name) {
  let parts = name.split(" ");
  let initials = "";

  if (parts.length > 1) {
    initials = parts[0][0] + parts[parts.length - 1][0];
  } else if (parts[0].length > 1) {
    initials = parts[0].substring(0, 2);
  } else {
    initials = parts[0];
  }
  return initials.toUpperCase();
};

/**
 * Function to create the div with the username of the registered users
 *
 * @param {string} name - the username of the registered user
 *
 */
function createNameDiv(name) {
  let nameDiv = document.createElement("div");
  nameDiv.appendChild(document.createTextNode(name));
  nameDiv.id = "nameDiv";
  return nameDiv;
};

/**
 * Function to clean the JSON String of the selected names of the registered users
 *
 * @param {string} names - the selected names of the registered users
 * @returns
 */
function cleanJSONString(names) {
  return JSON.stringify(names).replace(/"/g, "").slice(1, -1);
};

/**
 * Function to edit the Category List
 *
 */
function editCategoryList() {
  let categoryList = document.getElementById("categorys");
  categoryList.innerHTML = ``;

  for (let i = 0; i < cardlabel.length; i++) {
    const category = cardlabel[i];
    categoryList.innerHTML += `
        <option value="${category}">`;
  }
};

/**
 * Function to open the AssignedTo List
 *
 */
function openNameList() {
  let nameList = document.getElementById("checkbox");
  nameList.style.display = "flex";
};

/**
 * Function to show and hide the AssignedTo List
 *
 */
function showNameList() {
  let nameList = document.getElementById("checkbox");
  if (nameList.style.display == "none") {
    nameList.style.display = "flex";
  } else {
    nameList.style.display = "none";
  }
};

/**
 * Function to select the priority of the task. It also changes the color of the selected priority. The selected priority is saved in the selectedPriorityInput and gets pushed to the new task
 *
 * @param {string} priority - the priority of the task
 */
function selectPriority(priority) {
  let selectedPriorityInput = document.getElementById("selectedPriority");
  let previousSelectedDiv = document.querySelector(".selected");

  if (previousSelectedDiv) {
    previousSelectedDiv.classList.remove("selected");
    previousSelectedDiv.querySelector("img").style.filter =
      "brightness(1) invert(0)";
  }

  let selectedDiv = document.getElementById(priority);
  selectedDiv.classList.add("selected");
  selectedPriorityInput.value = priority;
  selectedDiv.querySelector("img").style.filter = "brightness(0) invert(1)";
};

/**
 * Function to filter the registered users in the AssignedTo Input. It filters the names by the first letter of the name if you type in the textfield
 *
 */
function filterContacts() {
  let input = document.getElementById("assignedTo");
  let filter = input.value.toUpperCase();
  let container = document.getElementById("checkbox");
  let labels = container.getElementsByTagName("label");

  for (let i = 0; i < labels.length; i++) {
    let label = labels[i];
    let textValue = label.textContent || label.innerText;

    if (textValue.toUpperCase().indexOf(filter) > -1) {
      label.style.display = "";
    } else {
      label.style.display = "none";
    }
  }
};

/**
 * Function to clear the assignedSelectedDiv
 * 
 */
function clearAssignedSelected() {
  let assignedSelectedDiv = document.querySelector("#assignedSelected");
  assignedSelectedDiv.innerHTML = "";
};

/**
 * Function to uncheck the checkboxes in the AssignedTo Input and to hide the AssignedTo List. It also set the background color and the color of the labels to the default value
 * 
 */
function uncheckCheckbox() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
    checkbox.parentElement.style.backgroundColor = "";
    checkbox.parentElement.style.color = "";
  });
  document.getElementById("checkbox").style.display = "none";
};

/**
 * Function to clear the values of the form container
 * 
 */
function clearFormContainer() {
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let assignedTo = document.getElementById("assignedToInput");
  let date = document.getElementById("date");
  let prio = document.getElementById("selectedPriority");
  let category = document.getElementById("category");
  let subtaskInput = document.getElementById("subtaskInput");
  let subtask = document.getElementById("subtaskList");

  title.value = ``;
  description.value = ``;
  assignedTo.value = ``;
  date.value = ``;
  prio.value = ``;
  category.value = ``;
  subtaskInput.value = ``;
  subtask.innerHTML = ``;
};

/**
 * Function to clear the selected priority. If nothing is selected, nothing happens 
 *
 */
function clearSelectedPriority() {
  let selectedPrio = document.querySelector(".selected");

  if (selectedPrio){
  selectedPrio.classList.remove("selected");
  selectedPrio.querySelector("img").style.filter = "brightness(1) invert(0)";
  } else {
    return;
  }
};