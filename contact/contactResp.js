/**
 * Function to edit the Detail Contact Card on Responsiv
 * 
 * @param {number} y - The index of the contact in the array
 */
function editRespContactWindow(y) {
  document.getElementById("btnContainerResp").style.display = "none";
  document.getElementById("editDeleteBtnContainerResp").style.display =
    "inline-flex";
  document.getElementById("contactRightResp").style.display = "inline-flex";
  document.getElementById("contactContainer").style.display = "none";
  document.getElementById("respName").innerHTML = contacts[y].name;
  document.getElementById("emailResp").innerHTML = contacts[y].mail;
  document.getElementById("phoneResp").innerHTML = contacts[y].phone;
  document.getElementById("respImg").src = randomProfilBadges[y];
  addRespInitials(y);
};

/**
 * Function to close the Detail Contact Card on Responsiv
 * 
 */
function closeRespDetailCard() {
  document.getElementById("contactRightResp").style.display = "none";
  document.getElementById("editDeleteBtnContainerResp").style.display = "none";
  document.getElementById("contactContainer").style.display = "block";
  document.getElementById("btnContainerResp").style.display = "inline-flex";
  document.getElementById("contactOptionsResp").style.display = "none";
};

/**
 * Function to add the Initials in the Detail Contact Card on Responsiv
 * 
 * @param {number} y - The index of the contact in the array
 */
function addRespInitials(y) {
  let name = contacts[y].name;
  let words = name.split(" ");
  let firstLetter = words[0].charAt(0).toUpperCase();
  let secondWordFirstLetter = words[1].charAt(0).toUpperCase();
  document.getElementById(
    "respInitials"
  ).innerHTML = `${firstLetter}${secondWordFirstLetter}`;
};

/**
 * Function to open the new Contact Display on Responsiv
 * 
 */
function openNewContactResp() {
  document.getElementById("newContactResp").style.display = "block";
  document.getElementById("background").style.display = "block";
  document.getElementById("btnContainerResp").style.display = "none";
};

/**
 * Function to close the new Contact Display on Responsiv
 * 
 */
function closeNewContactResp() {
  document.getElementById("newContactResp").style.display = "none";
  document.getElementById("background").style.display = "none";
  document.getElementById("btnContainerResp").style.display = "inline-flex";
};

/**
 * Function to create a new Contact on Responsiv and push it to the Array, clear the values and close the window
 * 
 */
function newContactResp() {
  let name = document.getElementById("newContactNameResp");
  let mail = document.getElementById("newContactMailResp");
  let phone = document.getElementById("newContactPhoneResp");
  let randomBadge =profilBadges[Math.floor(Math.random() * profilBadges.length)];

  let newContact = {
    name: name.value,
    mail: mail.value,
    phone: phone.value,
  };

  randomProfilBadges.push(randomBadge);
  contacts.push(newContact);

  clearNewContactValue(name, mail, phone);
  setContactData();
  editContactPlates();
  closeNewContactResp();
};

/**
 * Function to clear the new Contact Values on Responsiv
 * 
 */ 
function clearNewContactValue(name, mail, phone) {
  name.value = ``;
  mail.value = ``;
  phone.value = ``;
};

/**
 * Function to open the Edit Window on Responsiv
 * 
 * @param {number} y - The index of the contact in the array
 */
function openEditContactResp(y) {
  let editContact = document.getElementById("editContactResp");
  let background = document.getElementById("background");
  let littleFrame = document.getElementById("contactOptionsResp");
  let button = document.getElementById("editDeleteBtnContainerResp");
  button.style.display = "none";
  littleFrame.style.display = "none";
  editContact.style.display = "block";
  background.style.display = "block";
  fillEditContactResp(y);
};

/**
 * Function to fill the Edit Window on Responsiv with the values of the selected Contact
 * 
 * @param {number} y - The index of the contact in the array
 */
function fillEditContactResp(y) {
  let i = y;
  let name = document.getElementById("editContactNameResp");
  let mail = document.getElementById("editContactMailResp");
  let phone = document.getElementById("editContactPhoneResp");
  name.value = contacts[i].name;
  mail.value = contacts[i].mail;
  phone.value = contacts[i].phone;
  addRespInitialsEdit(y);
  addBadgeRespEdit(y);

  selectedContactIndex = y; // change the global selectedIndex to the Contactposition in the Array of the selected person
};

/**
 * Function to fill the Initials Div on Responsiv
 * 
 * @param {number} y - The index of the contact in the array
 */
function addRespInitialsEdit(y) {
  let name = contacts[y].name;
  let words = name.split(" ");
  let firstLetter = words[0].charAt(0).toUpperCase();
  let secondWordFirstLetter = words[1].charAt(0).toUpperCase();
  document.getElementById("editInitialsResp").innerHTML = `${firstLetter}${secondWordFirstLetter}`;
};

/**
 * Function to add the Badge in the Edit Window on Responsiv
 * 
 * @param {number} y - The index of the contact in the array
 */
function addBadgeRespEdit(y) {
  document.getElementById("editContactBadgetResp").src = randomProfilBadges[y];
};

/**
 * Function to close the Edit Window Response
 * 
 */
function closeEditContactResp() {
  document.getElementById("editContactResp").style.display = "none";
  document.getElementById("background").style.display = "none";
  closeRespDetailCard();
};

/**
 * Function to edit the little Delete and Edit Frame on Responsiv
 * 
 * @param {number} y - The index of the contact in the array
 */
function editRespDelAndEdit(y) {
  document.getElementById("contactOptionsResp").innerHTML = `
    <div id="deleteResp" onclick="openEditContactResp(${y})"><img src="/contact/img/edit.svg">Edit</div>
    <div id="editResp" onclick="deleteContactFloat(${y})"><img src="/contact/img/delete.svg">Delete</div>`;
};

/**
 * Function to show the little Delete and Edit Frame on Responsiv
 * 
 */
function slideInResp() {
  let options = document.getElementById("contactOptionsResp");
  if (options.style.display == "none") {
    options.style.display = "inline-flex";
  } else {
    options.style.display = "none";
  }
};

/**
 * Function to Update the Contacts after edit
 * 
 */
function updateContactRespEditWindow() {
  let name = document.getElementById("editContactNameResp").value;
  let mail = document.getElementById("editContactMailResp").value;
  let phone = document.getElementById("editContactPhoneResp").value;

  contacts[selectedContactIndex] = {
    name: name,
    mail: mail,
    phone: phone,
  };
  setContactData();
  editContactPlates();
  closeEditContactResp();
};

/**
 * Function to delete the contact in the edit Window
 * 
 */
function deleteContactRespEditWindow() {
  let i = selectedContactIndex;
  contacts.splice(i, 1);
  setContactData();
  editContactPlates();
  closeEditContactResp();
};