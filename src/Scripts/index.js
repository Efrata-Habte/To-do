import { saveProjects,loadProjects } from "./storage.js";  
import { renderProjects, renderTodos } from "./Dom.js";
import { addProjectToList } from "./project.js";
import { addTodoToList } from "./todo.js";

const addProject = document.querySelector('.add-project'); 
const addTodo = document.querySelector('.add-todo');
const addProjectBtn = document.querySelector('#add-project-btn');
const cancelProjectBtn = document.querySelector('#cancel-project-btn');       
const projectForm = document.querySelector('.project-form');
const addTodoBtn = document.querySelector('#add-todo-btn');
const cancelTodoBtn = document.querySelector('#cancel-todo-btn'); 
const todoForm = document.querySelector('.todo-form');
export const todoList = document.querySelector('.todo-list');
export const projectList = document.querySelector('.project-list');

console.log("Script loaded ✅");
console.log(addProject, addTodo, addProjectBtn, cancelProjectBtn);

// ===== Data =====
export let projects = loadProjects();
if(Object.keys(projects).length===0){
    projects["Default Projects"]=[];
}
export let activeProject =Object.keys(projects)[0] || "Default Project";

export function setActiveProject(name) {
    activeProject=name;
}

// ===== Show/Hide Forms =====
function showProjectForm() { projectForm.classList.remove('hidden'); }
function hideProjectForm() { projectForm.classList.add('hidden'); }
function showTodoForm() { todoForm.classList.remove('hidden'); }
function hideTodoForm() { todoForm.classList.add('hidden'); }


// ===== Event Listeners =====
addProject.addEventListener('click', showProjectForm);
addProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addProjectToList();
    hideProjectForm();
});
cancelProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#project-name').value = '';
    hideProjectForm();
});

addTodo.addEventListener('click', showTodoForm);
cancelTodoBtn.addEventListener('click', hideTodoForm);
addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTodoToList();
    hideTodoForm();
});

// ===== Project List Delegation =====
projectList.addEventListener('click', (e) => {
    const target = e.target;
    const li = target.closest('li.project');
    if (!li) return;

    const projectName = li.querySelector('.project-name').textContent;

    // Click project name -> make active
    if (target.classList.contains('project-name')) {
        activeProject = projectName;
        renderProjects();
    }

    // Delete Project
    if (target.classList.contains('delete-project')) {
        if (confirm('Are you sure you want to delete this project?')) {
            delete projects[projectName];
            activeProject = Object.keys(projects)[0] || "Default Project";
            saveProjects(projects);
            renderProjects();
        }
    }

    // Edit Project
    if (target.classList.contains('edit-project')) {
        const newName = prompt('Edit Project Name:', projectName);
        if (newName && newName.trim() !== '') {
            projects[newName.trim()] = projects[projectName];
            delete projects[projectName];
            activeProject = newName.trim();
            saveProjects(projects);
            renderProjects();
        }
    }
});

// ===== Todo List Delegation =====
todoList.addEventListener('click', (e) => {
    const target = e.target;
    const li = target.closest('li.todo');
    if (!li) return;

    // Show/hide description when todo clicked
    if (target.classList.contains('title') || target.classList.contains('due-date')) {
        const desc = li.querySelector('.description');
        desc.classList.toggle('show');
    }

    // Delete todo
    if (target.classList.contains('delete')) {
        const index = Array.from(todoList.children).indexOf(li);
        projects[activeProject].splice(index, 1);
        saveProjects(projects);
        renderTodos();
    }

    // Edit todo
    if (target.classList.contains('edit')) {
        const index = Array.from(todoList.children).indexOf(li);
        const todo = projects[activeProject][index];

        const newTitle = prompt('Edit Todo Title:', todo.title);
        const newDesc = prompt('Edit Todo Description:', todo.description);
        const newDate = prompt('Edit Due Date (YYYY-MM-DD):', todo.dueDate);

        if (newTitle && newTitle.trim() !== '') todo.title = newTitle.trim();
        if (newDesc !== null) todo.description = newDesc.trim();
        if (newDate !== null) todo.dueDate = newDate.trim();
        saveProjects(projects);
        renderTodos();
    }
});

// ===== Initial Render =====
renderProjects();
renderTodos();
