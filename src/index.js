import Task from "./task.js";
import Project from './project.js';
import DOM from "./dom.js";

const defaultProject = new Project("Default");
const projects = {
  all: [],
};

const projectNodes = {
  all: [],
}

projects.active = defaultProject;
const defprojnode = DOM.createProjectNode(projects.active);
projects.all.push(defaultProject);
DOM.setProjectNode(projects.active);
projectNodes.active = defprojnode;
projectNodes.all.push(defprojnode);

DOM.appendProjectNode(defprojnode);

function createProject(e) {
  const formData = DOM.submitData(e, DOM.projectModal, DOM.projectModalComponents);
  if (!formData) {
    return;
  }
  const project = new Project(formData.name);
  
  projects.all.push(project);
  const projectNode = DOM.createProjectNode(project);
  DOM.appendProjectNode(projectNode);
  if (formData.setActive === "on") {
    projects.active = project;
    DOM.setProjectNode(projects.active);
    projectNodes.active = projectNode;
  }

}

function createTask(e) {
  const formData = DOM.submitData(e, DOM.taskModal, DOM.taskModalComponents);
  if (!formData) {
    return;
  }
  const task = new Task(
    formData.title, formData.description,
    formData.duedate, formData.priority
  )
  projects.active.addTask(task);
  const taskNode = DOM.createTaskInDOM(task, projectNodes.active);
  projects.active.addTaskNode(taskNode);
}

DOM.projectModalComponents.submitButton.addEventListener('click', e => {
  createProject(e);
})


DOM.taskModalComponents.submitButton.addEventListener("click", (e) => {
  createTask(e)
});

const st = new Task("m", "m", "m/m/m", "9");
const stn = DOM.createTaskInDOM(st, defprojnode);
projects.active.addTask(st);
projects.active.addTaskNode(stn);