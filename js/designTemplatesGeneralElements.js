function initProfileBadgesUser() {
}

function taskSearchString() {
    return
}

function renderButtonsForPriority() {
}


function setActiveButtonForPriorityTo(setPriority) {
    let setClassForButton = `priorityButton${cardPriority[setPriority]}`;
    let setClassForButtonIcon = `priorityButton${cardPriority[setPriority]}Icon`;

    // resetPriorityButton
    document.getElementById(setClassForButton).classList.remove(`buttonForPriority`);
    document.getElementById(setClassForButtonIcon).classList.remove(`buttonForPriorityIcon${cardPriority[setPriority]}`);
    document.getElementById(setClassForButtonIcon).classList.remove(`OverlayPriorityIcon`);

    document.getElementById(setClassForButton).classList.add(`buttonActiveForPriority${cardPriority[setPriority]}`);
    document.getElementById(setClassForButtonIcon).classList.add(`OverlayPriorityIcon${cardPriority[setPriority]}White`);
    document.getElementById(setClassForButtonIcon).classList.add(`buttonForPriorityIcon`);
}