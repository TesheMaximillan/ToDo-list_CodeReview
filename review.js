/* eslint-disable import/extensions */
import './main.scss';

const listContainer = document.querySelector('.list-container__items');
const notification = document.querySelector('.notification');
const roration = document.querySelector('.fa-arrows-rotate');
const form = document.querySelector('.list-container__list-content');
const checkbox = document.querySelectorAll('input[type=checkbox]');
const taskName = document.querySelectorAll('.task-name');
const deleteList = document.querySelectorAll('.bar');
const clearButton = document.querySelector('.list-container__remove-all');


let tasks = [];

const storage = localStorage.getItem('listItem');
tasks = storage === null ? [] : JSON.parse(storage);

const task = {
  description: '',
  completed: false,
  index: 0,
};

// Loading...
const spinner = () => {
  roration.classList.add('spinner');
  setTimeout(() => {
    roration.classList.remove('spinner');
  }, 2000);
};

const createElement = (element = '', className = [''], text = '', type = '', value = '', name = '') => {
  const newElement = document.createElement(element);
  newElement.classList.add(...className);
  newElement.textContent = text;
  newElement.type = type;
  newElement.value = value;
  newElement.name = name;
  return newElement;
};

// Display tasks on eash list-item
const displayTask = () => {
  tasks.sort((a, b) => a.index - b.index);
  tasks.forEach((e) => {
    const i = createElement('i', ['icon', 'fa-solid', 'fa-ellipsis-vertical', 'bar']);
    const input = createElement('input', ['checkbox'], '', 'checkbox');
    const span = createElement('input', ['task-name'], '', '', e.description);
    const li = createElement('li', ['list-container__items--item']);
    li.append(input, span, i);
    listContainer.appendChild(li);
  });
  notification.textContent = tasks.length;
};

displayTask();

// Update Index after the list removal
const updateIndex = () => {
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i;
  }
};

// Add task
const addTask = () => {
  form.addEventListener('submit', (event) => {
    task.description = form.elements.list.value;
    task.index = tasks.length;
    tasks.push(task);
    localStorage.setItem('listItem', JSON.stringify(tasks));
    form.elements.list.value = '';
    window.location.reload();
    event.preventDefault();
  });
};

// Remove single Task
const removeTask = (index) => {
  tasks.splice(index, 1);
  updateIndex();
  window.localStorage.setItem('listItem', JSON.stringify(tasks));
};

// Remove completed task using filter method
const removeCompletedTask = () => {
  tasks = tasks.filter((task) => task.completed === false);
  updateIndex();
  window.localStorage.setItem('listItem', JSON.stringify(tasks));
};

// Update Task
const updateTask = (index, value) => {
  tasks[index].description = value;
  window.localStorage.setItem('listItem', JSON.stringify(tasks));
};

// Modify the list completed section
const status = (index, type) => {
  tasks[index].completed = type;
};

// Remove the selected color from all of the tasks <Yellowish color>
const removeHighlight = () => {
  taskName.forEach((e) => {
    e.parentElement.classList.remove('list-highlight');
    e.nextElementSibling.classList.remove('icon-delete');
  });
};

// Mark task as completed or not, and update the task
const markTask = () => {
  for (let i = 0; i < checkbox.length; i += 1) {
    checkbox[i].addEventListener('change', () => {
      if (checkbox[i].checked) {
        checkbox[i].classList.add('input-after');
        checkbox[i].nextElementSibling.classList.add('checked');
        status(i, true);
      } else {
        checkbox[i].classList.remove('input-after');
        checkbox[i].nextElementSibling.classList.remove('checked');
        status(i, false);
      }
    });
  }
};

// Select a task, then, either update that specific task or delete that task
const selectATask = () => {
  for (let i = 0; i < taskName.length; i += 1) {
    taskName[i].addEventListener('click', () => {
      removeHighlight();
      taskName[i].parentElement.classList.add('list-highlight');
      taskName[i].nextElementSibling.classList.add('icon-delete');

      deleteList[i].addEventListener('click', () => {
        removeTask(i);
        window.location.reload();
      });

      taskName[i].addEventListener('input', () => {
        updateTask(i, taskName[i].value);
      });
    });
  }
};

// Clear completed task and and reload the page
const clearCompletedTasks = () => {
  clearButton.addEventListener('click', () => {
    removeCompletedTask();
    window.location.reload();
  });
};

// Load and display the number of tasks
spinner();

// Create and Add new task
addTask();

/**
 * 1. Highlight the selected task
 * 2. Remove the list when the delete icon is pressed
 * 3. Update task list when the value of the task is changed
 */
selectATask();

// Select or Unselect for task status <completed or Not>
markTask();

// Clear complted tasks
clearCompletedTasks();