const addProject = document.querySelector('.add-project'); 
const addTodo = document.querySelector('.add-todo');
const addProjectBtn = document.querySelector('#add-project-btn');
const cancelProjectBtn = document.querySelector('#cancel-project-btn');       
const projectForm = document.querySelector('.project-form');
const addTodoBtn = document.querySelector('#add-todo-btn');
const cancelTodoBtn = document.querySelector('#cancel-todo-btn'); 
const todoForm = document.querySelector('.todo-form');
const todoList= document.querySelector('.todo-list');

// ===== Show/Hide Forms =====
function showProjectForm() { projectForm.classList.remove('hidden'); }
function hideProjectForm() { projectForm.classList.add('hidden'); }
function showTodoForm() { todoForm.classList.remove('hidden'); }
function hideTodoForm() { todoForm.classList.add('hidden'); }

// ===== Add Project =====
function addProjectToList() {
    const projectList = document.querySelector('.project-list');
    const projectNameValue = document.querySelector('#project-name').value.trim();

    if (!projectNameValue) {
        alert('Project name cannot be empty.');
        return;
    }

    const li = document.createElement('li');
    li.classList.add('project');
    li.innerHTML = `
        <span class="project-name">${projectNameValue}</span>
        <div class="project-buttons">
            <button class="edit-project">✏️</button>
            <button class="delete-project">✖</button>
        </div>
    `;

    projectList.appendChild(li);
    document.querySelector('#project-name').value = '';
}


// ===== Add Todo =====
function addTodoToList() {
    const todoTitleValue = document.querySelector('#todo-title').value.trim();
    const todoDescValue = document.querySelector('#todo-desc').value.trim();
    const todoDateValue = document.querySelector('#todo-date').value;
    const todoPriorityValue = document.querySelector('#todo-priority').value;

    if (!todoTitleValue) {
        alert('Todo title cannot be empty.');
        return;
    }

    const li = document.createElement('li');
    li.classList.add('todo', `${todoPriorityValue}-priority`);
    li.innerHTML = `
        <div class="todo-content">
            <span class="title">${todoTitleValue}</span>
            <span class="due-date">${todoDateValue ? `Due: ${todoDateValue}` : 'No deadline'}</span>
            <span class="description hidden">${todoDescValue}</span>
        </div>
        <div class="todo-buttons">
            <button class="edit">✏️</button>
            <button class="delete">✖</button>
        </div>
    `;

    todoList.appendChild(li);

    // Clear input fields
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
document.querySelector('.project-list').addEventListener('click', (e) => {
    const target = e.target;

    // Delete Project
    if (target.classList.contains('delete-project')) {
        const projectItem = target.closest('li');
        if (confirm('Are you sure you want to delete this project?')) {
            projectItem.remove();
        }
        return;
    }

    // Edit Project
    if (target.classList.contains('edit-project')) {
        const projectItem = target.closest('li');
        const projectNameSpan = projectItem.querySelector('.project-name');
        const currentName = projectNameSpan.textContent;
        const newName = prompt('Edit Project Name:', currentName);
        if (newName !== null && newName.trim() !== '') {
            projectNameSpan.textContent = newName.trim();
        }
    }
});


// ===== Todo List Delegation =====
document.querySelector('.todo-list').addEventListener('click', (e) => {
    const target = e.target;   
    
    //delete todo
    if(target.classList.contains('delete')) {
        const todoItem= target.closest('li');
        if(confirm('Are you sure you want to delete this todo?')) {
            todoItem.remove();
        }
    }

    // Edit todo
    if(target.classList.contains('edit')) {
        const todoItem = target.closest('li');
        const titleSpan = todoItem.querySelector('.title');
        const descSpan = todoItem.querySelector('.description');
        const dateSpan = todoItem.querySelector('.due-date');
        const currentTitle = titleSpan.textContent;
        const currentDesc = descSpan.textContent;
        const currentDate = dateSpan.textContent.replace('Due: ', '');  

        const newTitle=prompt('Edit Todo Title:', currentTitle);
        const newDesc=prompt('Edit Todo Description:', currentDesc);
        const newDate=prompt('Edit Due Date (YYYY-MM-DD):', currentDate ==='No deadline' ? '' : currentDate);   

        if(newTitle !== null && newTitle.trim() !=='') {
            titleSpan.textContent=newTitle.trim();
        }
        if(newDesc !== null) {
            descSpan.textContent=newDesc.trim();
        }
        if(newDate !== null) {
            dateSpan.textContent=newDate.trim() ? `Due: ${newDate.trim()}` : 'No deadline';
        }
        if(descSpan.classList.contains('hidden')) {
            descSpan.classList.remove('hidden');
        }
    }
});