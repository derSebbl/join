let greetingText;

async function initSummary() {
    await loadUser();
    await includeHTMLSummary();
    showToDoCount();
    showDoneCount();
    showUrgentCount();
    showUrgentDeadline();
    showAllTasks();
    showTaskInProgress();
    showTaskFeedback();
    showActiveUser();
    showUrgentDeadline();
}

/**
 * Function to check how many cards are in the to-do column
 * 
 */
function showToDoCount() {
    let number = document.getElementById('todoColor1');
    number.innerHTML = '';
    let targetValue = 'boardColumnToDo';
    let count = 0;
    for (let i = 0; i < boardTodos.length; i++) {
        if (boardTodos[i].columnCategory === targetValue) {
            count++;
           }
    }

    number.innerHTML += `${count}`;
};

/**
 * Function to check how many cards are in the done column
 * 
 */
function showDoneCount() {
    let number = document.getElementById('doneColor1');
    number.innerHTML = '';
    let targetValue = 'boardColumnDone';
    let count = 0;
    for (let i = 0; i < boardTodos.length; i++) {
        if (boardTodos[i].columnCategory === targetValue) {
            count++;
           }
    }

    number.innerHTML += `${count}`;
};

/**
 * Function to check how many cards are in the urgent column
 * 
 */
function showUrgentCount() {
    let number = document.getElementById('urgentColor1');
    number.innerHTML = '';
    let targetValue = 2;
    let count = 0;
    for (let i = 0; i < boardTodos.length; i++) {
        if (boardTodos[i].priority === targetValue) {
            count++;
           }
    }
    number.innerHTML += `${count}`;
};

/**
 * Function to check how many cards are on the board
 * 
 */
function showAllTasks() {
    let number = document.getElementById('taskColor1');
    number.innerHTML = '';
    let count = 0;
    for (let i = 0; i < boardTodos.length; i++) { {
            count++;
           }
    }
    number.innerHTML += `${count}`;
};

/**
 * Function to check how many cards are in the in progress column
 * 
 */
function showTaskInProgress() {
    let number = document.getElementById('taskColor3');
    number.innerHTML = '';
    let targetValue = 'boardColumnInProgress';
    let count = 0;
    for (let i = 0; i < boardTodos.length; i++) {
        if (boardTodos[i].columnCategory === targetValue) {
            count++;
           }
    }
    number.innerHTML += `${count}`;
};

/**
 * Function to check how many cards are in the feedback column
 * 
 */
function showTaskFeedback() {
    let number = document.getElementById('taskColor5');
    number.innerHTML = '';
    let targetValue = 'boardColumnAwaitFeedback';
    let count = 0;
    for (let i = 0; i < boardTodos.length; i++) {
        if (boardTodos[i].columnCategory === targetValue) {
            count++;
           }
    }
    number.innerHTML += `${count}`;
};


/**
 * Function to check the earliest due date of the urgent cards
 * 
 */
function showUrgentDeadline() {
    let number = document.getElementById('urgentColor3');
    number.innerHTML = '';

    const priority2Todos = boardTodos.filter(todo => todo.priority === 2);
    if (priority2Todos.length === 0) {
        number.innerHTML = '-';
        return;
    }
    priority2Todos.sort((a, b) => a.duedate - b.duedate);
    const earliestDueDateTodo = priority2Todos[0];
    const duedate = earliestDueDateTodo.duedate * 1000; // Umwandeln in Millisekunden
    const formattedDueDate = new Date(duedate).toLocaleDateString();
    number.innerHTML = `${formattedDueDate}`;
};

/**
 * Function to show the active user for the greeting text
 * 
 */
function showActiveUser() {
    let name = document.getElementById('greetingName');
        name.innerHTML = '';
       name.innerHTML += currentUser.username;

        correctGreetingText();
    };

/**
 * Function to show the correct greeting text depending on the time of the day
 * 
 */
function correctGreetingText(){
    let greetings = document.getElementById('rightGreeting')
    let now = new Date();
    let hour = now.getHours();
    if (hour >= 5 && hour < 12) {
        greetingText = "Good morning";
    } else if (hour >= 12 && hour < 18) {
        greetingText = "Good afternoon";
    } else {
        greetingText = "Good evening";
    }

    greetings.innerHTML = greetingText;
};
