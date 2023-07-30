let todoItemsContainerEl = document.getElementById("todoItemsConatiner");
let savetodobutton = document.getElementById("saveToDoButton");
// TO SET THE ITEMS ON THE LOCAL STORAGE
savetodobutton.onclick = function () {
  localStorage.setItem("todolist", JSON.stringify(todolist));
};

// TO GET THE ITEMS FROM THE LOCAL STORAGE

function getTodoListFromLocalStrorage() {
  let stringified = localStorage.getItem("todolist");
  let parsetodolist = JSON.parse(stringified);
  if (parsetodolist === null) {
    return [];
  } else {
    return parsetodolist;
  }
}

// TO STORE THE LOCAL RETURNED ITEMS

let todolist = getTodoListFromLocalStrorage();

function todoTaskCompletedOrNot(checkboxId, labelId, todolistid) {
  let checkboxid = document.getElementById(checkboxId);
  let labelid = document.getElementById(labelId);
  labelid.classList.toggle("striking-to-the-completed-task");

  let todoitemindex = todolist.findIndex(function (eachToDo) {
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

function todoTaskDelete(todolistid) {
  let tododitem = document.getElementById(todolistid);
  todoItemsContainerEl.removeChild(tododitem);
  let deletedtodoitemindex = todolist.findIndex(function (eachToDo) {
    let eachToDoId = "todocontainer" + eachToDo.id;
    if (eachToDoId === todolistid) {
      return true;
    } else {
      return false;
    }
  });
  todolist.splice(deletedtodoitemindex, 1);
}
// TO ADD TODO TASK IN DYNAMIC PART
function todoListItems(item) {
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
  checkBoxEl.classList.add(
    "todo-items-checkbox",
    "striking-to-the-completed-task"
  );
  checkBoxEl.onclick = function () {
    todoTaskCompletedOrNot(checkboxId, labelId, todolistid);
  };
  listItemsEl.appendChild(checkBoxEl);

  let divContainerEl = document.createElement("div");
  divContainerEl.classList.add(
    "d-flex",
    "flex-row",
    "todo-items-label-conatiner"
  );
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
  deleteIconEl.onclick = function () {
    todoTaskDelete(todolistid);
  };
}

let todolistcount = todolist.length;
// SETTING TODO TASK DETAILS
function addingTodoTask() {
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
    isChecked: false,
  };
  todolist.push(newtodo);
  todoListItems(newtodo);
  userInput.value = "";
}
// AFTER CLICK ON THE BUTTON ADD IT WILL CALL THE ADDTODO TASK FUNCTION

let addToDoButton = document.getElementById("addTodoButton");
addToDoButton.onclick = function () {
  addingTodoTask();
};

//ADDING EACH TODO IN THE UNORDERLIST
for (let item of todolist) {
  todoListItems(item);
}
