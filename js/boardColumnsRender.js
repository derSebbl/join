window.addEventListener('resize', function() {
    ChangeParentsResp();
});

/**
 * Renders the title container for each board column.
 * The title container includes the column title and a plus button for adding new tasks.
 * 
 */
function renderBoardColumnTitleContainer() {
    let outputColumnTitle = '';
    let columnTitle;
    let plusButtonIcons = '';
    for (let i = 0; i < boardColumn.length; i++) {
        plusButtonIcons = renderPlusButtonIcons(i);
        switch (i) {
            case 0:
                columnTitle = 'To do';
                id = 'To do';
                break;
            case 1:
                columnTitle = 'In progress';
                id = 'In progress';
                break;
            case 2:
                columnTitle = 'Await feedback';
                id = 'Await feedback';
                break;
            case 3:
                columnTitle = 'Done';
                id = 'Done';
                plusButtonIcons = '';
                break;
            default:
                break;
        }
        outputColumnTitle += `
                                <div class="boardColumnTitleOneColumn" id="${id}">
                                    <div class="TitleField">
                                    ${columnTitle}
                                    ${plusButtonIcons}
                                    </div>
                                </div>
                            `;
    }
    document.getElementById('boardColumnTitleContainer').innerHTML = outputColumnTitle;
};

/**
 * Renders the plus button icons for each board column.
 * The plus button is used to create new tasks in the column.
 *
 * @param {number} i - The index of the board column.
 * @returns {string} A string representing the HTML for the plus button icons.
 */
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
};

/**
 * Renders the board columns.
 * Each column is a drop zone for tasks and has an associated ondrop, ondrag, ondragleave, and ondragover event.
 * 
 */
function renderBoardColumns() {
    let outputColumns = '';
    for (let i = 0; i < boardColumn.length; i++) {
        outputColumns += `<div id="${boardColumn[i]}" class="boardTaskColumn" ondrop="moveTo('${boardColumn[i]}'); setTasksData()" ondrag="highlight(${i})" ondragleave="removeHighlight(${i})" ondragover="allowDrop(event)"></div>`;
    }
    document.getElementById('boardColumnContainer').innerHTML = outputColumns;
};

/**
 * Changes the parent elements of the board columns and search bar based on the window width.
 * If the window width is less than 1420, each board column is appended to its corresponding header and the search bar is appended to the board header.
 * If the window width is 1420 or greater, the ChangeParentsRespBack function is called.
 * 
 */
function ChangeParentsResp() {
    const headers = ['To do', 'In progress', 'Await feedback', 'Done'];
    const columns = ['boardColumnToDo', 'boardColumnInProgress', 'boardColumnAwaitFeedback', 'boardColumnDone'];

    if (window.innerWidth < 1420) {
        headers.forEach((header, index) => {
            document.getElementById(header).appendChild(document.getElementById(columns[index]));
        });
        document.getElementById('boardHeader').appendChild(document.getElementById('search'));
    } else {
        ChangeParentsRespBack();
    }
};

/**
 * Reverts the changes made by the ChangeParentsResp function.
 * Each board column is appended back to the main column container and the search bar is appended back to the search and add task container.
 * 
 */
function ChangeParentsRespBack() {
    const mainColumnContainer = document.getElementById('boardColumnContainer');
    const searchAndAddTask = document.getElementById('searchAndAddTask');
    const columns = ['boardColumnToDo', 'boardColumnInProgress', 'boardColumnAwaitFeedback', 'boardColumnDone'];

    columns.forEach(column => {
        const columnElement = document.getElementById(column);
        mainColumnContainer.appendChild(columnElement);
    });

    const search = document.getElementById('search');
    searchAndAddTask.appendChild(search);
};

