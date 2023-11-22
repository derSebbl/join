let greetingText;

let summaryDates = ['29.11.2023', '30.12.2023', '01.01.2024'];

async function initSummary() {
    await loadUser();
    includeHTMLSummary();
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

//shows open amount of to-dos
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
}

//shows amount of all to-dos which are done
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
}

//shows amount of all open urgent to-dos
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
}

//shows next deadline for urgent to-do
function showUrgentDeadline() {
    let number = document.getElementById('urgentColor3');
    number.innerHTML = '';

    earliestDate = summaryDates.reduce(function (pre, cur) {
        return Date.parse(pre) > Date.parse(cur) ? cur : pre;
    });
    
    number.innerHTML = `${earliestDate}`;
}

//shows total amount of tasks in board
function showAllTasks() {
    let number = document.getElementById('taskColor1');
    number.innerHTML = '';
    let count = 0;
    for (let i = 0; i < boardTodos.length; i++) { {
            count++;
           }
    }
    number.innerHTML += `${count}`;
}

//shows amount of tasks in progress
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
}

//shows amount of tasks which require feddback
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
}

//shows user who is currently logged in
function showActiveUser() {
    let name = document.getElementById('greetingName');
        name.innerHTML = '';
       name.innerHTML += currentUser.username;

        correctGreetingText();
    }

//displays correct greeting text
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
}