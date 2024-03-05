const DOM = (function () {
    const wrapper = document.querySelector("#wrapper");
    const addTaskButton = document.querySelector("#add-task");
    const taskModal = document.querySelector("#task-modal");
    const taskModalComponents = {
      form: document.querySelector("#task-info"),
      closeButton: document.querySelector("#close-modal"),
      submitButton: document.querySelector("#submit-modal"),
    }
    const activeProjectNode = document.querySelector("#active-project");

    function setProjectNode(active) {
      activeProjectNode.textContent = "Active Project: " + 
      active.formalName;
    }

    const tasks = [];

    addTaskButton.addEventListener('click', displayTaskModal);
    taskModalComponents.closeButton.addEventListener('click', 
    closeTaskModal)

    function displayTaskModal() {
      taskModal.showModal();
    }

    function resetForm(form) {
      form.reset();
    }

    function submitTaskData(e) {
      const formData = Object.fromEntries(new FormData(
      taskModalComponents.form));
      if (checkFormData(formData)) {
        resetForm(taskModalComponents.form);
        e.preventDefault();
        closeTaskModal();
      } else {
        return;
      }
      return formData;
    }

    function checkFormData(data) {
      for (let key in data) {
        if (!data[key]) {
          return false;
        }
      }
      return true;
    }

    function closeTaskModal() {
      taskModal.close();
    }

    function createProjectNode(project) {
      const projectNode = document.createElement('div');
      const title = document.createElement('p');
      title.textContent = project.formalName + " Project";
      projectNode.appendChild(title);
      return projectNode;
    }

    function appendProjectNode(projectNode) {
      wrapper.appendChild(projectNode);
    }
  
    function createDisplayOfTask(task) {
      const title = document.createElement('h4');
      title.textContent = task.title;
  
      const description = document.createElement('p');
      description.textContent = task.description;
  
      const dueDate = document.createElement('span');
      dueDate.textContent = task.dueDate + " ";
  
      const priority = document.createElement('span');
      priority.textContent = task.priority;

      const deleteTask = document.createElement('button');
      const taskObj = {title, description, dueDate, priority, deleteTask};
      deleteTask.textContent = "Delete Task";
  
      return taskObj;
    }
  
    function createTaskInDOM(task, projectNode) {
      const createdNode = document.createElement("div");
      const components = createDisplayOfTask(task);
      /************** STYLE FOR TESTING ONLY **************/
      createdNode.style.border = '1px solid black';
      
      for (let componentKey in components) {
        createdNode.appendChild(components[componentKey]);
      }

      components.deleteTask.addEventListener('click', () => {
        removeTask({task, createdNode}, tasks, projectNode);
      })
  
      projectNode.appendChild(createdNode);
      tasks.push({task, createdNode});
      return {task, createdNode};
    }

    function removeTask(taskObj, tasks, projectNode) {
      const node = taskObj.createdNode;
      const task = taskObj.task;

      projectNode.removeChild(node);
      tasks.splice(tasks.indexOf(task), 1);
    }
  
    return {
taskModalComponents, submitTaskData, createTaskInDOM, removeTask,
setProjectNode, createProjectNode, appendProjectNode
};
  })();

export default DOM;