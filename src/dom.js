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
  
      return {title, description, dueDate, priority};
    }
  
    function createTaskInDOM(task) {
      const createdNode = document.createElement("div");
      const components = createDisplayOfTask(task);
      /************** STYLE FOR TESTING ONLY **************/
      createdNode.style.border = '1px solid black';
      
      createdNode.append(components.title, components.description,
          components.dueDate, components.priority)
  
      wrapper.appendChild(createdNode);
      tasks.push({ task, createdNode });
    }
  
    return { taskModalComponents, submitTaskData, createTaskInDOM };
  })();

export default DOM;