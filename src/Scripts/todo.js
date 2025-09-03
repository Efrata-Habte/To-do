import { saveProjects, loadProjects } from "./storage.js";
import { projects, activeProject } from "./index.js";
import { renderTodos } from "./Dom.js";

// ===== Add Todo =====
export function addTodoToList() {
    const title = document.querySelector('#todo-title').value.trim();
    const desc = document.querySelector('#todo-desc').value.trim();
    const dueDate = document.querySelector('#todo-date').value;
    const priority = document.querySelector('#todo-priority').value;

    if (!title) { alert('Todo title cannot be empty.'); return; }

    const todo = { title, description: desc, dueDate, priority };
    projects[activeProject].push(todo);
    saveProjects(projects);
    renderTodos();

    document.querySelector('#todo-title').value = '';
    document.querySelector('#todo-desc').value = '';
    document.querySelector('#todo-date').value = '';
    document.querySelector('#todo-priority').selectedIndex=0;
}