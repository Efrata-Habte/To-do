const addProject = document.querySelector('.add-project'); 
const addTodo = document.querySelector('.add-todo');
const addProjectBtn = document.querySelector('#add-project-btn');
const cancelProjectBtn = document.querySelector('#cancel-project-btn');       
const projectForm = document.querySelector('.project-form'); 

function showProjectForm() {
  projectForm.classList.remove('hidden'); 
}

function hideProjectForm() {
  projectForm.classList.add('hidden'); 
}

addProject.addEventListener('click', showProjectForm);
cancelProjectBtn.addEventListener('click',hideProjectForm);
