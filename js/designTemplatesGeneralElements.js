/**
 * Sets the active button for the priority.
 *
 * @param {number} setPriority - The priority to be set.
 */
function setActiveButtonForPriorityTo(setPriority) {
    let setClassForButton = `priorityButton${cardPriority[setPriority]}`;
    let setClassForButtonIcon = `priorityButton${cardPriority[setPriority]}Icon`;

    document.getElementById(setClassForButton).classList.remove(`buttonForPriority`);
    document.getElementById(setClassForButtonIcon).classList.remove(`buttonForPriorityIcon${cardPriority[setPriority]}`);
    document.getElementById(setClassForButtonIcon).classList.remove(`OverlayPriorityIcon`);
    document.getElementById(setClassForButton).classList.add(`buttonActiveForPriority${cardPriority[setPriority]}`);
    document.getElementById(setClassForButtonIcon).classList.add(`OverlayPriorityIcon${cardPriority[setPriority]}White`);
    document.getElementById(setClassForButtonIcon).classList.add(`buttonForPriorityIcon`);
};

function showSwitches(x, event) {
    event.stopPropagation();
    let contentContainer = document.getElementById(`cardContent${x}`);
   let switchContainer = document.getElementById(`switchColumns${x}`);
   if (switchContainer.style.display === `none`) {
        switchContainer.style.display = `flex`;
        contentContainer.style.display = `none`;       
   } else {
   switchContainer.style.display = `none`;
   contentContainer.style.display = `flex`;
   }
};
function switchColumn(cardId, columnId, event) {
    event.stopPropagation();
    // Hier holen wir die Karte und die Spalte, in die sie verschoben werden soll
    let card = document.getElementById(`cardContent${cardId}`);
    let column = document.getElementById(`column${columnId}`);

    if (!card) {
        console.error(`Kein Element gefunden mit der ID cardContent${cardId}`);
        return;
    }

    if (!column) {
        console.error(`Kein Element gefunden mit der ID column${columnId}`);
        return;
    }

    // Dann entfernen wir die Karte aus ihrer aktuellen Spalte
    card.parentNode.removeChild(card);

    // Und fügen sie in die neue Spalte ein
    column.appendChild(card);
}