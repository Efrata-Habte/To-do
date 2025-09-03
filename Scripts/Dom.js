import { saveProjects, loadProjects } from "./storage.js";
import { projects, activeProject ,projectList,todoList} from "./index.js";

// ===== Render Projects =====
export function renderProjects() {
    projectList.innerHTML = '';
    for (let project in projects) {
        const li = document.createElement('li');
        li.classList.add('project');
        if (project === activeProject) li.classList.add('active');

        li.innerHTML = `
            <span class="project-name">${project}</span>
            <div class="project-buttons">
                <button class="edit-project">✏️</button>
                <button class="delete-project">✖</button>
            </div>
        `;
        projectList.appendChild(li);
    }
    saveProjects(projects); 
    renderTodos();
}

// ===== Render Todos =====
export function renderTodos() {
    if (!projects[activeProject]) {
        projects[activeProject] = [];
    }

    todoList.innerHTML = '';
    projects[activeProject].forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo', `${todo.priority}-priority`);
        li.innerHTML = `
            <div class="todo-content">
                <span class="title">${todo.title}</span>
                <span class="due-date">${todo.dueDate ? `Due: ${todo.dueDate}` : 'No deadline'}</span>
                <span class="description hidden">${todo.description}</span>
            </div>
            <div class="todo-buttons">
                <button class="edit">✏️</button>
                <button class="delete">✖</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

