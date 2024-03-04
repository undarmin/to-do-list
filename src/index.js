import Task from './task.js';
import DOM from './dom.js';

const task1 = new Task(
  "Create to-do list app",
  "Create to-do list app from TOP",
  "12/12/121212",
  4
);
DOM.createTaskInDOM(task1);