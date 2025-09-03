export function saveProjects(projects){
    localStorage.setItem('projects',JSON.stringify(projects));
}

export function loadProjects(){
    const stored= localStorage.getItem('projects');
    return stored? JSON.parse(stored) : { "Default Project": []} ;
}