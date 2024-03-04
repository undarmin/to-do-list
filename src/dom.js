const DOM = (function () {
    const wrapper = document.querySelector("#wrapper");
    const tasks = [];
  
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
  
    return { createTaskInDOM };
  })();

export default DOM;