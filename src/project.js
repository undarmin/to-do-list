class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.taskNodes = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    addTaskNode(taskNode) {
        this.taskNodes.push(taskNode);
    }
}

export default Project;