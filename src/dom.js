const DOM = (function () {
    const wrapper = document.querySelector("#wrapper");
    const addTaskButton = document.querySelector("#add-task");
    const taskModal = document.querySelector("#task-modal");
    const taskModalComponents = {
      form: document.querySelector("#task-info"),
      closeButton: document.querySelector("#close-modal"),
      submitButton: document.querySelector("#submit-modal"),
    }

    const projectModal = document.querySelector("#project-modal");
    const projectModalComponents = {
      form: document.querySelector("#project-info"),
      closeButton: document.querySelector("#close-project-modal"),
      submitButton: document.querySelector("#submit-project-modal")
    }

    const activeProjectNode = document.querySelector("#active-project");
    const projectsList = document.querySelector("#projects");
    const newProjectButton = document.querySelector("#new-project");

    newProjectButton.addEventListener('click', () => {
      displayModal(projectModal);
    });
    projectModalComponents.closeButton.addEventListener('click', () => {
      closeModal(projectModal);
    })

    function setProjectNode(active) {
      activeProjectNode.textContent = "Active Project: " + 
      active.name;
    }

    const tasks = [];

    addTaskButton.addEventListener('click', () => {
      displayModal(taskModal)
    });
    taskModalComponents.closeButton.addEventListener('click', 
    () => {
      closeModal(taskModal);
    })

    function displayModal(modal) {
      modal.showModal();
    }

    function addProjectToProjectList(project) {
      const li = document.createElement('li');
      li.textContent = project.name;
      projectsList.appendChild(li);
    }

    function resetForm(form) {
      form.reset();
    }

    function submitData(e, modal, modalComponents) {
      const formData = Object.fromEntries(new FormData(
      modalComponents.form));
      if (checkFormData(formData)) {
        resetForm(modalComponents.form);
        e.preventDefault();
        closeModal(modal);
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

    function closeModal(modal) {
      modal.close();
    }

    function createProjectNode(project) {
      const projectNode = document.createElement('div');
      const title = document.createElement('p');
      const setAsDefault = document.createElement('button');
      setAsDefault.textContent = "set as active";
      title.textContent = project.name + " Project";
      projectNode.appendChild(title);
      projectNode.appendChild(setAsDefault);
      addProjectToProjectList(project);
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
taskModalComponents, submitData, createTaskInDOM, removeTask,
setProjectNode, createProjectNode, appendProjectNode, taskModal,
taskModalComponents, projectModal, projectModalComponents
};
  })();

export default DOM;