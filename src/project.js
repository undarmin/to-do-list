class Project {
    constructor(name, formalName) {
        this.name = name;
        this.tasks = [];
        this.taskNodes = [];
        this.formalName = formalName;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    addTaskNode(taskNode) {
        this.taskNodes.push(taskNode);
    }
}

export default Project;