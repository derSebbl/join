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