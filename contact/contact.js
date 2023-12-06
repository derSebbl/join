let selectedContactIndex = -1 //Index for the Edit Function

const profilBadges = [
  "/contact/img/Ellipse 1.svg",
  "/contact/img/Ellipse 2.svg",
  "/contact/img/Ellipse 3.svg",
  "/contact/img/Ellipse 4.svg",
  "/contact/img/Ellipse 5.svg",
  "/contact/img/Ellipse 6.svg",
]

/**
 * Function to initialize the contact page
 * 
 */
async function initContact() {
  // await includeHTML();
  // await initRender();
  // initUserProfileInitials();
  await loadContactData();
  editContactPlates();
}

/**
 * Eventlistener who checks if the window is resized and if it to small it calls the function closeResponse.
 * 
 */
window.addEventListener('resize', closeResponse);

/**
 * Function to close the Response Window if the window is resized to big.
 * 
 */
function closeResponse(){
  if (window.innerWidth > 1300) {
    closeNewContactResp();
    closeEditContactResp();
    closeRespDetailCard();
    document.getElementById('btnContainerResp').style.display="none";
}else {
  document.getElementById('btnContainerResp').style.display="inline-flex";
}
};

/**
 * Function to show and hide the editContact Window in Responsive.
 * 
 * @param {number} x - Index of the selected Contact 
 */
function slideIn(x) {
  editFloatingDisplay(x);
  let floatingFrame = document.getElementById("floatingFrame");
  if (window.innerWidth > 1300){
  if (floatingFrame.style.display == "none") {
    floatingFrame.style.display = "inline-flex";
    changeColorNamePlate(x);
  } else {
    floatingFrame.style.display = "none";
    standardColorNamePlate();
  }
}
};

/**
 * Function to edit the Contact Detail Window in Responsive.
 * 
 * @param {number} y - Index of the selected Contact
 */
function editFloatingDisplay(y) {
  if (window.innerWidth > 1300){
    let name = contacts[y].name;
    let words = name.split(' ');
    let firstLetter = words[0].charAt(0).toUpperCase();
    let secondWordFirstLetter = words[1].charAt(0).toUpperCase();
  document.getElementById("nameBig").innerHTML = name
  document.getElementById("floatEmail").innerHTML = contacts[y].mail;
  document.getElementById("floatPhone").innerHTML = contacts[y].phone;
  document.getElementById("ImgFloatingDisplay").src = randomProfilBadges[y];
  document.getElementById("bigInitials").innerHTML = `${firstLetter}${secondWordFirstLetter}`;
  document.getElementById("bigContainerImg").innerHTML = `
    <div class="edit" id="edit" onclick="editContact(${y})"><img src="/contact/img/edit.svg">Edit</div>
    <div class="delete" onclick="deleteContactFloat(${y})" id="delete(${y})"><img src="/contact/img/delete.svg">Delete</div>`;
}else{
  editRespContactWindow(y);
  editRespDelAndEdit(y);
}
};

/**
 * Function to sort the Contacts by the first Letter of the Name.
 * 
 * @param {string} contacts - Array of all Contacts
 * @returns 
 */
function sortContacts(contacts) {
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Function to add the Letter Segment to the Contact List.
 * 
 * @param {Element} contactList - HTML Element who contains all Contacts
 * @param {Element} letter - HTML Element who contains the Letter of the Contact
 */
function addLetterSegment(contactList, letter) {
  contactList.innerHTML += /*html*/`
    <div class="letterSection">${letter}
    <img class="lineLetterSection" src="/contact/img/Vector 10.svg"></div>
  `;
};

/**
 * Function to add the Contact to the Contact List and edit the HTML Elements.
 * 
 * @param {Element} contactList - HTML Element who contains all Contacts
 * @param {Array} contact - Arraay of all Contacts
 * @param {number} i - Index of the selected Contact
 */
function addContact(contactList, contact, i) {
  let name = contact.name;
  let mail = contact.mail;
  let words = name.split(' ');
  let firstLetter = words[0].charAt(0).toUpperCase();
  let secondWordFirstLetter = words[1].charAt(0).toUpperCase();

  contactList.innerHTML += `
    <div onclick="slideIn(${i})" id="contactPlate${i}" class="contactPlate">
    <div class="profilBadge">
      <img class="profilBadgeImg" src="${randomProfilBadges[i]}">      
      <div id= "initials-container">${firstLetter}${secondWordFirstLetter}</div>
    </div>
    <div class="contactInfo">
      <span class="contactName" id="contactName${i}">${name}</span>
      <span class="contactEmail" id="contactEmail${i}">${mail}</span>
    </div>
    `;
};

/**
 * Function to edit the Contact Plates and sort them. If the Letter is already created it checks the position from the second letter t sort it right. If no Letter is created it calls the function addLetterSegment.
 * 
 */
function editContactPlates() {
  let contactList = document.getElementById("contactList");
  let currentLetter = null;
  let sortedContacts = sortContacts(contacts);
  contactList.innerHTML = ``;

  for (let i = 0; i < sortedContacts.length; i++) {
    let name = sortedContacts[i].name;
    let words = name.split(' ');
    let firstLetter = words[0].charAt(0).toUpperCase();
    
    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      addLetterSegment(contactList, currentLetter);
    }

    addContact(contactList, sortedContacts[i], i);
  }
};

/**
 * Function to create a new Contact and add it to the Array. It also set the Badged coloer to the new Contact.
 * 
 */
function newContact() {
  let name = document.getElementById("newContactName");
  let mail = document.getElementById("newContactMail");
  let phone = document.getElementById("newContactPhone");
  let randomBadge = profilBadges[Math.floor(Math.random() * profilBadges.length)];

  let newContact = {
    name: name.value,
    mail: mail.value,
    phone: phone.value,
  };
  
  randomProfilBadges.push(randomBadge);
  contacts.push(newContact);
  setContactData();
  clearValuesNewContact(name, mail, phone);
};

/**
 * Function to clear the Values of the new Contact Window.
 * 
 * @param {string} name - Name of the new Contact
 * @param {string} mail - Mail of the new Contact
 * @param {string} phone - Phone of the new Contact
 */
function clearValuesNewContact(name, mail, phone) {
  name.value = ``;
  mail.value = ``;
  phone.value = ``;
  
  editContactPlates();
};

/**
 * Function to show the new Contact Window.
 * 
 */
function addNewContact() {
  let newContact = document.getElementById("newContactContainer");
  let background = document.getElementById("background");
  let personPlate = document.getElementById("floatingFrame");
  newContact.style.display = "flex";
  background.style.display = "block";
  personPlate.style.display = "none";
  standardColorNamePlate();
};

/**
 * Function to show the Edit Contact Window.
 * 
 * @param {number} x - Index of the selected Contact
 */
function editContact(x) {
  let editContact = document.getElementById("editContactContainer");
  let background = document.getElementById("background");
  let personPlate = document.getElementById("floatingFrame");
  editContact.style.display = "flex";
  background.style.display = "block";
  personPlate.style.display = "none";
  fillEditContact(x);
};

/**
 * Function to close the New Contact Window and clear the Values.
 * 
 */
function closeNewContact() {
  let newContact = document.getElementById("newContactContainer");
  let background = document.getElementById("background");
  let name = document.getElementById("newContactName");
  let mail = document.getElementById("newContactMail");
  let phone = document.getElementById("newContactPhone");
  newContact.style.display = "none";
  background.style.display = "none";
  name.value = ``;
  mail.value = ``;
  phone.value = ``;
};

/**
 * Function to close the Edit Contact Window and set the backgroundcoor of the Contact Plate back to normal.
 * 
 */
function closeEditContact() {
  let editContact = document.getElementById("editContactContainer");
  let background = document.getElementById("background");
  editContact.style.display = "none";
  background.style.display = "none";
  standardColorNamePlate();
};

/**
 * Function to switch the Backgroundcolor and Color of the selected Contact Plate.
 * 
 * @param {number} x - Index of the selected Contact
 */
function changeColorNamePlate(x) {
  let contactPlate = document.getElementById(`contactPlate${x}`);
  let contactText = document.getElementById(`contactName${x}`);
  contactPlate.classList.add("selectedBackground");
  contactText.style.color = "white";
};

/**
 * Function to switch the Backgroundcolor and Color of the selected Contact Plate back to normal.
 * 
 */
function standardColorNamePlate() {
  let contactPlate = document.querySelectorAll(".contactPlate"); 
  let contactText = document.querySelectorAll(".contactName");  

  for (let i = 0; i < contactPlate.length; i++) {
    contactPlate[i].classList.remove("selectedBackground");
  }                                                             
  for (let i = 0; i < contactText.length; i++) {
    contactText[i].style.color = "black";
}                                                               
};

/**
 * Function to Fill the edit Contact Window with the Data of the selected Contact.
 * 
 * @param {number} x - Index of the selected Contact
 */
function fillEditContact(x) {
  let i = x;
  let name = document.getElementById('editContactName');
  let mail = document.getElementById('editContactMail');
  let phone = document.getElementById('editContactPhone');
  name.value = contacts[i].name;
  mail.value = contacts[i].mail;
  phone.value = contacts[i].phone;

  selectedContactIndex = x; // change the global selectedIndex to the Contactposition in the Array of the selected person
  createEditBadges(i);
  };

/**
 * Function to create the Badge and Initials on the Edit Contact Window.
 * 
 * @param {number} i - Index of the selected Contact
 */
  function createEditBadges(i) {
    let img = document.getElementById('editImg');
    let initials = document.getElementById('editInitials');
    let name = contacts[i].name;
    let words = name.split(' ');
    let firstLetter = words[0].charAt(0).toUpperCase();
    let secondWordFirstLetter = words[1].charAt(0).toUpperCase(); 
    img.src = randomProfilBadges[i];
    initials.innerHTML = `${firstLetter}${secondWordFirstLetter}`;
  };

/**
 * Function to overrite the Contact with the new Data in the Array
 * 
 */
function updateContact() {
  let name = document.getElementById('editContactName').value;
  let mail = document.getElementById('editContactMail').value;
  let phone = document.getElementById('editContactPhone').value;
  
    contacts[selectedContactIndex] = {
      name: name,
      mail: mail,
      phone: phone
    };
  
  editContactPlates();
  setContactData();
  closeEditContact();
};

/**
 * Function to delete the Contact in the edit Window.
 * 
 */
function deleteContact() {
  let i = selectedContactIndex;
  contacts.splice(i, 1);
  randomProfilBadges.splice(i, 1);
  editContactPlates();
  setContactData();
  closeEditContact();
};

/**
 * Function to delete the Contact in the Detail Window.
 * 
 * @param {number} i - Index of the selected Contact
 */
function deleteContactFloat(i) {
  contacts.splice(i, 1);
  randomProfilBadges.splice(i, 1);
  let addContactResp = document.getElementById("btnContainerResp");
  editContactPlates();
  setContactData();
  closeFloatingFrame();
  closeResponse();
  closeRespDetailCard();
  if (window.innerWidth > 1300){
  addContactResp.style.display="none";
  }
};

/**
 * Fucntion to close the Detail Window.
 * 
 */
function closeFloatingFrame() {
  let floatingFrame = document.getElementById("floatingFrame");
  floatingFrame.style.display = "none";
};

/**
 * Function to edit the Contact Initials.
 * 
 */
function editInitalsContacts() {
  for (let i = 0; i < contacts.length; i++) {
    let name = contacts[i].name;
    let words = name.split(' ');
    let firstLetter = words[0].charAt(0).toUpperCase();
    let secondWordFirstLetter = words[1].charAt(0).toUpperCase();
    document.getElementById("initials-container").innerHTML = `
    ${firstLetter}${secondWordFirstLetter}`;
}
};

/**
 * Function to edit a random Badge to the Contact.
 * 
 */
function initializeRandomProfilBadges() {
  for (let i = 0; i < contacts.length; i++) {
    randomProfilBadges[i] = profilBadges[Math.floor(Math.random() * profilBadges.length)];
  }
}

initializeRandomProfilBadges();