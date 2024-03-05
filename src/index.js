import Task from "./task.js";
import Project from './project.js';
import DOM from "./dom.js";

const defaultProject = new Project("default", "Default");
const projects = {
  all: [],
};

projects.active = defaultProject;
DOM.setProjectNode(projects.active);

const defprojnode = DOM.createProjectNode(projects.active);
DOM.appendProjectNode(defprojnode);

function createTask(e) {
  const formData = DOM.submitTaskData(e);
  if (!formData) {
    return;
  }
  const task = new Task(
    formData.title, formData.description,
    formData.duedate, formData.priority
  )
  projects.active.addTask(task);
  const taskNode = DOM.createTaskInDOM(task, defprojnode);
  projects.active.addTaskNode(taskNode);
}

DOM.taskModalComponents.submitButton.addEventListener("click", (e) => {
  createTask(e)
});

const st = new Task("m", "m", "m/m/m", "9");
const stn = DOM.createTaskInDOM(st, defprojnode);
projects.active.addTask(st);
projects.active.addTaskNode(stn);