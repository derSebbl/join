window.addEventListener('resize', function() {
    ChangeParentsResp();
});

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

function ChangeParentsResp(){
    let ToDoHeader = document.getElementById('To do');
    let InProgressHeader = document.getElementById('In progress');
    let AwaitFeedbackHeader = document.getElementById('Await feedback');
    let DoneHeader = document.getElementById('Done');
    let ToDoColumn = document.getElementById('boardColumnToDo');
    let InProgressColumn = document.getElementById('boardColumnInProgress');
    let AwaitFeedbackColumn = document.getElementById('boardColumnAwaitFeedback');
    let DoneColumn = document.getElementById('boardColumnDone');
    let boardHeader = document.getElementById('boardHeader');
    let search = document.getElementById('search');

    if(window.innerWidth < 1300){
    ToDoHeader.appendChild(ToDoColumn);
    InProgressHeader.appendChild(InProgressColumn);
    AwaitFeedbackHeader.appendChild(AwaitFeedbackColumn);
    DoneHeader.appendChild(DoneColumn);
    boardHeader.appendChild(search);
    } else {
        ChangeParentsRespBack();
    }
};

function ChangeParentsRespBack(){
    let MainColumnContainer = document.getElementById('boardColumnContainer');
    let searchAndAddTask = document.getElementById('searchAndAddTask');
    let ToDoColumn = document.getElementById('boardColumnToDo');
    let InProgressColumn = document.getElementById('boardColumnInProgress');
    let AwaitFeedbackColumn = document.getElementById('boardColumnAwaitFeedback');
    let DoneColumn = document.getElementById('boardColumnDone');
    let search = document.getElementById('search');

    MainColumnContainer.appendChild(ToDoColumn);
    MainColumnContainer.appendChild(InProgressColumn);
    MainColumnContainer.appendChild(AwaitFeedbackColumn);
    MainColumnContainer.appendChild(DoneColumn);
    searchAndAddTask.appendChild(search);
};

