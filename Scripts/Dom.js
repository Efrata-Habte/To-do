const addProject = document.querySelector('.add-project'); 
const addTodo = document.querySelector('.add-todo');
const addProjectBtn = document.querySelector('#add-project-btn');
const cancelProjectBtn = document.querySelector('#cancel-project-btn');       
const projectForm = document.querySelector('.project-form');
const addTodoBtn = document.querySelector('#add-todo-btn');
const cancelTodoBtn = document.querySelector('#cancel-todo-btn'); 
const todoForm = document.querySelector('.todo-form');
const todoList= document.querySelector('.todo-list');
const deleteButtons = document.getElementsByClassName('delete');


function showProjectForm() {
  projectForm.classList.remove('hidden'); 
}

function hideProjectForm() {
  projectForm.classList.add('hidden'); 
}

function showTodoForm() {
  todoForm.classList.remove('hidden'); 
}

function hideTodoForm() {
  todoForm.classList.add('hidden'); 
}

function addProjectToList() {
    const projectList= document.querySelector('.project-list');
    const list=document.createElement('li');
    const projectNameValue=document.querySelector('#project-name').value;

    if(projectNameValue.trim() === '') {
        alert('Project name cannot be empty.');
        return;
    } // Prevent adding empty project names

    list.textContent=projectNameValue;
    list.classList.add('project')
    projectList.appendChild(list);
    document.querySelector('#project-name').value=''; // Clear input field after adding
}

function addTodoToList() {
    const list=document.createElement('li');
    const todoTitleValue=document.querySelector('#todo-title').value;
    const todpoDescValue=document.querySelector('#todo-desc').value;
    const todoDateValue=document.querySelector('#todo-date').value;
    const todoPriorityValue=document.querySelector('#todo-priority').value;

    if(todoTitleValue.trim()=== '') {
        alert('Todo title cannot be empty.');
        return;
    }

    list.innerHTML=`
    <div>
        <span class="title">${todoTitleValue}</span>
        <br>
        <p class="description ">${todpoDescValue}</p>
        <span class="due-date">${todoDateValue ? `Due: ${todoDateValue}` : 'No deadline'}</span>
        
    </div>
    <button class="delete">✖</button>
    `;
    list.classList.add('todo', `${todoPriorityValue}-priority`);

    todoList.appendChild(list);
    document.querySelector('#todo-title').value='';
    document.querySelector('#todo-desc').value='';
    document.querySelector('#todo-date').value='';
    document.querySelector('#todo-priority').value='';

}

// Event Listeners

addProject.addEventListener('click', showProjectForm);
addProjectBtn.addEventListener('click',(e) => {
    e.preventDefault(); // Prevent form submission
    addProjectToList();
    hideProjectForm()
    });

cancelProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#project-name').value=''; // Clear input field on cancel
    hideProjectForm()
});

addTodo.addEventListener('click', showTodoForm);
cancelTodoBtn.addEventListener('click', hideTodoForm);
addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTodoToList();
    hideTodoForm();
});

document.querySelector('.todo-list').addEventListener('click', (e) =>{
    if(e.target.classList.contains('delete')) {
        const todoItem = e.target.closest('li');
        todoItem.remove();
    }
});
