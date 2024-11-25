const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delet-all-button");
const filterButtons = document.querySelectorAll(".filters-todos");

let Todos = JSON.parse(localStorage.getItem("Todos")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("Todos", JSON.stringify(Todos));
};

const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const displayTodos = (data) => {
  const todoList = data || Todos;
  todosBody.innerHTML = "";
  if (!todoList.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!</td></tr>";
    return;
  }

  todoList.forEach((todo) => {
    todosBody.innerHTML += `
    <tr>
      <td>${todo.task}</td>
      <td>${todo.date || "No Date"}</td>
      <td>${todo.completed ? "completed" : "Pending"}</td>
      <td>
        <button onclick="editHandler('${todo.id}')">Edit</button>
        <button onclick="doHAndler('${todo.id}')">
          ${todo.completed ? "undo" : "do"}
        </button>
        <button onclick="deleteHandler('${todo.id}')">Delete</button>
      </td>
    </tr>`;
  });
};

const deleteAllHandler = () => {
  if (Todos.length) {
    Todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("All todos cleared successfully", "success");
  } else {
    showAlert("No todos to clear", "error");
  }
};

const doHAndler = (id) => {
  const todo = Todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo status changed successfully", "success");
};

const deleteHandler = (id) => {
  const newTodos = Todos.filter((todo) => todo.id !== id);
  Todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo deleted successfully", "success");
};

const editHandler = (id) => {
  const todo = Todos.find((todo) => todo.id === id);
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none";
  editButton.style.display = "inline-block";
  editButton.dataset.id = id;
};

const applyEditHandler = (event) => {
  const id = event.target.dataset.id;
  const todo = Todos.find((todo) => todo.id === id);
  todo.task = taskInput.value;
  todo.date = dateInput.value;
  taskInput.value = "";
  dateInput.value = "";
  editButton.style.display = "none";
  addButton.style.display = "inline-block";
  saveToLocalStorage();
  displayTodos();
  showAlert("Edit was successfully", "success");
};

const filterHandler = (event) => {
  let filteredTodos = null;
  const filter = event.target.dataset.filter;
  if (filter === "pending") {
    filteredTodos = Todos.filter((todo) => todo.completed === false);
  } else if (filter === "completed") {
    filteredTodos = Todos.filter((todo) => todo.completed === true);
  } else {
    filteredTodos = Todos;
  }

  displayTodos(filteredTodos);
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const Todo = {
    id: generateId(),
    task,
    date,
    completed: false,
  };
  if (task) {
    Todos.push(Todo);
    saveToLocalStorage();
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";
    showAlert("Todo added successfully", "success");
  } else {
    showAlert("pleas enter a Todo!", "error");
  }
};

filterButtons.forEach((button) => {
  button.addEventListener("click", filterHandler);
});

addButton.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
window.addEventListener("load", () => displayTodos());
editButton.addEventListener("click", applyEditHandler);
