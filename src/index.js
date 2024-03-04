import Task from "./task.js";
import DOM from "./dom.js";

DOM.taskModalComponents.submitButton.addEventListener("click", (e) => {
  const formData = DOM.submitTaskData(e);
  if (!formData) {
    return;
  }
  const task = new Task(
    formData.title, formData.description,
    formData.duedate, formData.priority
  )
  const taskNode = DOM.createTaskInDOM(task);
});

const st = new Task("m", "m", "m/m/m", "9");
const stn = DOM.createTaskInDOM(st);