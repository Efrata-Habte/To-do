const addProject = document.querySelector('.add-project'); 
const addTodo = document.querySelector('.add-todo');
const addProjectBtn = document.querySelector('#add-project-btn');
const cancelProjectBtn = document.querySelector('#cancel-project-btn');       
const projectForm = document.querySelector('.project-form');
const addTodoBtn = document.querySelector('#add-todo-btn');
const cancelTodoBtn = document.querySelector('#cancel-todo-btn'); 
const todoForm = document.querySelector('.todo-form');
const todoList = document.querySelector('.todo-list');
const projectList = document.querySelector('.project-list');

// ===== Data =====
let projects = {
    "Default Project": []
};
let activeProject = "Default Project";

// ===== Show/Hide Forms =====
function showProjectForm() { projectForm.classList.remove('hidden'); }
function hideProjectForm() { projectForm.classList.add('hidden'); }
function showTodoForm() { todoForm.classList.remove('hidden'); }
function hideTodoForm() { todoForm.classList.add('hidden'); }

// ===== Render Projects =====
function renderProjects() {
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
    renderTodos();
}

// ===== Render Todos =====
function renderTodos() {
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

// ===== Add Project =====
function addProjectToList() {
    const projectNameValue = document.querySelector('#project-name').value.trim();
    if (!projectNameValue) { alert('Project name cannot be empty.'); return; }
    if (projects[projectNameValue]) { alert('Project already exists.'); return; }

    projects[projectNameValue] = [];
    activeProject = projectNameValue;
    renderProjects();
    document.querySelector('#project-name').value = '';
}

// ===== Add Todo =====
function addTodoToList() {
    const title = document.querySelector('#todo-title').value.trim();
    const desc = document.querySelector('#todo-desc').value.trim();
    const dueDate = document.querySelector('#todo-date').value;
    const priority = document.querySelector('#todo-priority').value;

    if (!title) { alert('Todo title cannot be empty.'); return; }

    const todo = { title, description: desc, dueDate, priority };
    projects[activeProject].push(todo);
    renderTodos();

    document.querySelector('#todo-title').value = '';
    document.querySelector('#todo-desc').value = '';
    document.querySelector('#todo-date').value = '';
    document.querySelector('#todo-priority').value = 'high';
}

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

        renderTodos();
    }
});

// ===== Initial Render =====
renderProjects();
