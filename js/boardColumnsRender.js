function renderBoardColumnTitleContainer() {
    let outputColumnTitle = '';
    let columnTitle;
    let plusButtonIcons = '';
    for (let i = 0; i < boardColumn.length; i++) {
        plusButtonIcons = renderPlusButtonIcons(i);
        switch (i) {
            case 0:
                columnTitle = 'To do';
                break;

            case 1:
                columnTitle = 'In progress';
                break;

            case 2:
                columnTitle = 'Await feedback';
                break;

            case 3:
                columnTitle = 'Done';
                plusButtonIcons = '';
                break;

            default:
                break;
        }
        outputColumnTitle += `
                                <div class="boardColumnTitleOneColumn">
                                    <div id="${columnTitle}>${columnTitle}</div>
                                    ${plusButtonIcons}
                                </div>
                            `;
    }
    document.getElementById('boardColumnTitleContainer').innerHTML = outputColumnTitle;
}

function renderPlusButtonIcons(i) {
    return `
                <div class="plusButtonIcons" onclick="createNewTaskInColumn(${i})">
                    <div class="plusButtonIconDefault"><img class="plusButtonIconDefaultImage"
                            src="../assets/icons/plusButtonIconDefault.svg" alt="Add"></div>
                    <div class="plusButtonIconHover"><img class="plusButtonIconHoverImage"
                            src="../assets/icons/plusButtonIconHover.svg" alt="Add"></div>
                    <div class="plusButtonIconWhileClick"><img class="plusButtonIconWhileClickImage"
                            src="../assets/icons/plusButtonIconWhileClick.svg" alt="Add"></div>
                </div>

            `;
} 

function renderBoardColumns() {
    let outputColumns = '';
    for (let i = 0; i < boardColumn.length; i++) {
        outputColumns += `<div id="${boardColumn[i]}" class="boardTaskColumn" ondrop="moveTo('${boardColumn[i]}'); setTasksData()" ondrag="highlight(${i})" ondragleave="removeHighlight(${i})" ondragover="allowDrop(event)"></div>`;
    }
    document.getElementById('boardColumnContainer').innerHTML = outputColumns;
}