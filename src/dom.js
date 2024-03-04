const DOM = (function () {
    const wrapper = document.querySelector("#wrapper");
    const addTaskButton = document.querySelector("#add-task");
    const taskModal = document.querySelector("#task-modal");
    const taskModalComponents = {
      form: document.querySelector("#task-info"),
      closeButton: document.querySelector("#close-modal"),
      submitButton: document.querySelector("#submit-modal"),
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
  
    function createTaskInDOM(task) {
      const createdNode = document.createElement("div");
      const components = createDisplayOfTask(task);
      /************** STYLE FOR TESTING ONLY **************/
      createdNode.style.border = '1px solid black';
      
      for (let componentKey in components) {
        createdNode.appendChild(components[componentKey]);
      }

      components.deleteTask.addEventListener('click', () => {
        removeTask({task, createdNode}, tasks);
      })
  
      wrapper.appendChild(createdNode);
      tasks.push({task, createdNode});
      return {task, createdNode};
    }

    function removeTask(taskObj, tasks) {
      const node = taskObj.createdNode;
      const task = taskObj.task;

      wrapper.removeChild(node);
      tasks.splice(tasks.indexOf(task), 1);
    }
  
    return {
taskModalComponents, submitTaskData, createTaskInDOM, removeTask
};
  })();

export default DOM;