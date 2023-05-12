let todoItemsContainerEl = document.getElementById("todoItemsConatiner");
let savetodobutton = document.getElementById("saveToDoButton");

savetodobutton.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(todolist));
};

function gettodolistfromlocalstrorage() {
    let stringified = localStorage.getItem("todolist");
    let parsetodolist = JSON.parse(stringified);
    if (parsetodolist === null) {
        return [];
    } else {
        return parsetodolist;
    }
}
let todolist = gettodolistfromlocalstrorage();




function todotaskcompletedornot(checkboxId, labelId, todolistid) {
    let checkboxid = document.getElementById(checkboxId);
    let labelid = document.getElementById(labelId);
    labelid.classList.toggle("striking-to-the-completed-task");

    let todoitemindex = todolist.findIndex(function(eachToDo) {
        let eachToDoId = "todocontainer" + eachToDo.id;
        if (eachToDoId === todolistid) {
            return true;
        } else {
            return false;
        }

    });
    let todoobject = todolist[todoitemindex];
    if (todoobject.isChecked === true) {
        todoobject.isChecked = false;
    } else {
        todoobject.isChecked = true;
    }

}

function todotaskdelete(todolistid) {
    let tododitem = document.getElementById(todolistid);
    todoItemsContainerEl.removeChild(tododitem);
    let deletedtodoitemindex = todolist.findIndex(function(eachToDo) {
        let eachToDoId = "todocontainer" + eachToDo.id;
        if (eachToDoId === todolistid) {
            return true;
        } else {
            return false;
        }
    });
    todolist.splice(deletedtodoitemindex, 1);
}

function todolistitems(item) {
    let checkboxId = "checkbox" + item.id;
    let labelId = "label" + item.id;
    let todolistid = "todocontainer" + item.id;

    let listItemsEl = document.createElement("li");
    listItemsEl.classList.add("todo-item-conatainer", "d-flex", "flex-row");
    listItemsEl.id = todolistid;
    todoItemsContainerEl.appendChild(listItemsEl);


    let checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    checkBoxEl.id = checkboxId;
    checkBoxEl.checked = item.isChecked;
    checkBoxEl.classList.add("todo-items-checkbox", "striking-to-the-completed-task");
    checkBoxEl.onclick = function() {
        todotaskcompletedornot(checkboxId, labelId, todolistid);
    };
    listItemsEl.appendChild(checkBoxEl);

    let divContainerEl = document.createElement("div");
    divContainerEl.classList.add("d-flex", "flex-row", "todo-items-label-conatiner");
    listItemsEl.appendChild(divContainerEl);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.textContent = item.text;
    if (item.isChecked === true) {
        labelElement.classList.add("striking-to-the-completed-task");
    }
    labelElement.classList.add("todo-items-checkbox-label-element");
    labelElement.id = labelId;
    divContainerEl.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("todo-items-delete-icon-container");
    divContainerEl.appendChild(deleteIconContainer);

    let deleteIconEl = document.createElement("i");
    deleteIconEl.classList.add("todo-items-delete-icon", "far", "fa-trash-alt");
    deleteIconContainer.appendChild(deleteIconEl);
    deleteIconEl.onclick = function() {
        todotaskdelete(todolistid);

    };

}

let todolistcount = todolist.length;

function addingtodotask() {
    let userInput = document.getElementById("userTaskInput");
    let taskadded = userInput.value;
    if (taskadded === "") {
        alert("Enter Valid Text");
        return;
    }
    todolistcount = todolistcount + 1;

    let newtodo = {
        text: taskadded,
        id: todolistcount,
        isChecked: false
    }
    todolist.push(newtodo);
    todolistitems(newtodo);
    userInput.value = "";

}
let addToDoButton = document.getElementById("addTodoButton");
addToDoButton.onclick = function() {
    addingtodotask();
};

for (let item of todolist) {
    todolistitems(item);
}