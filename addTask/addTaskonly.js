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
}