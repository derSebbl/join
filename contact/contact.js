let selectedContactIndex = -1 //Index for the Edit Function

const profilBadges = [
  "/contact/img/Ellipse 1.svg",
  "/contact/img/Ellipse 2.svg",
  "/contact/img/Ellipse 3.svg",
  "/contact/img/Ellipse 4.svg",
  "/contact/img/Ellipse 5.svg",
  "/contact/img/Ellipse 6.svg",
]

async function initContact() {
  // await includeHTML();
  // await initRender();
  // initUserProfileInitials();
  editContactPlates();
}

/////////////////////////////////////////////////////////////////

window.addEventListener('resize', closeResponse);

function closeResponse(){
  if (window.innerWidth > 1300) {
    closeNewContactResp();
    closeEditContactResp();
    closeRespDetailCard();
    document.getElementById('btnContainerResp').style.display="none";
}else {
  document.getElementById('btnContainerResp').style.display="inline-flex";
}
}
/////////////////////////////////////////////////////////////////



// Function let floatingFrame slide in if the Contact get clicked
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

//Function edit the FLoating Display with BigName etc.
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




function editContactPlates() {
  let contactList = document.getElementById("contactList");
  contactList.innerHTML = ``;

  let currentLetter = null;

  contacts.sort((a, b) => a.name.localeCompare(b.name));  // Sort Contacts by Name

  for (let i = 0; i < contacts.length; i++) {
    let name = contacts[i].name;
    let mail = contacts[i].mail;
    let words = name.split(' ');
    let firstLetter = words[0].charAt(0).toUpperCase();
    let secondWordFirstLetter = words[1].charAt(0).toUpperCase();
    
    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;

      contactList.innerHTML += /*html*/`
        <div class="letterSection">${currentLetter}
        <img class="lineLetterSection" src="/contact/img/Vector 10.svg"></div>
      `;  
    }                                                                             // Edit the Sort. Letter and Line in Contact List
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
  }
};

// Function to edit a new Contact and push it to the Array
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
  clearValuesNewContact(name, mail, phone);
};


function clearValuesNewContact(name, mail, phone) {
  name.value = ``;
  mail.value = ``;
  phone.value = ``;
  
  editContactPlates();
}

// Show Window for New Contact
function addNewContact() {
  let newContact = document.getElementById("newContactContainer");
  let background = document.getElementById("background");
  let personPlate = document.getElementById("floatingFrame");
  newContact.style.display = "flex";
  background.style.display = "block";
  personPlate.style.display = "none";
  standardColorNamePlate();
}

// Show Window for Edit Contact
function editContact(x) {
  let editContact = document.getElementById("editContactContainer");
  let background = document.getElementById("background");
  let personPlate = document.getElementById("floatingFrame");
  editContact.style.display = "flex";
  background.style.display = "block";
  personPlate.style.display = "none";
  fillEditContact(x);
}

// Close Window New Contact
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
}

// Close Window Edit Contact
function closeEditContact() {
  let editContact = document.getElementById("editContactContainer");
  let background = document.getElementById("background");
  editContact.style.display = "none";
  background.style.display = "none";
  standardColorNamePlate();
}

// Function to Change BackgroundColor on aktive Person
function changeColorNamePlate(x) {
  let contactPlate = document.getElementById(`contactPlate${x}`);
  let contactText = document.getElementById(`contactName${x}`);
  contactPlate.classList.add("selectedBackground");
  contactText.style.color = "white";
}

// Function to Change back BackgroundColor on aktive Person
function standardColorNamePlate() {
  let contactPlate = document.querySelectorAll(".contactPlate"); // save all Elements with the class "contactPlate"
  let contactText = document.querySelectorAll(".contactName");  // save all Elements with the class "contactName"

  for (let i = 0; i < contactPlate.length; i++) {
    contactPlate[i].classList.remove("selectedBackground");
  }                                                             // making the changes of the Codeblock on all Elements wit class "contactPlate"
  for (let i = 0; i < contactText.length; i++) {
    contactText[i].style.color = "black";
}                                                               // making the changes of the Codeblock on all Elements wit class "contactName"
}

//Function to Fill the editContact Fields
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

//Function to create the Badges on the Edit Contact Window
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


//Edit the selected Contact and change the Array data if you click on Save
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
  closeEditContact();
};

// Function to delete a Contact on Edit-Display
function deleteContact() {
  let i = selectedContactIndex;
  contacts.splice(i, 1);
  randomProfilBadges.splice(i, 1);
  editContactPlates();
  closeEditContact();
};

// Function to delete a Contact on the floating Display
function deleteContactFloat(i) {
  contacts.splice(i, 1);
  randomProfilBadges.splice(i, 1);
  editContactPlates();
  closeFloatingFrame();
  closeResponse();
  closeRespDetailCard();
};

// Function to close the floating Display
function closeFloatingFrame() {
  let floatingFrame = document.getElementById("floatingFrame");
  floatingFrame.style.display = "none";
};

// Function to edit the Initials on the User Profile
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

// Function to edit an random Badge to the Array
function initializeRandomProfilBadges() {
  for (let i = 0; i < contacts.length; i++) {
    randomProfilBadges[i] = profilBadges[Math.floor(Math.random() * profilBadges.length)];
  }
}

initializeRandomProfilBadges();