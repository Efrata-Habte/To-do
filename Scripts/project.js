import { saveProjects, loadProjects } from "./storage.js";
import { projects, activeProject } from "./index.js";
import { renderProjects } from "./Dom.js";

// ===== Add Project =====
export function addProjectToList() {
    const projectNameValue = document.querySelector('#project-name').value.trim();
    if (!projectNameValue) { alert('Project name cannot be empty.'); return; }
    if (projects[projectNameValue]) { alert('Project already exists.'); return; }

    projects[projectNameValue] = [];
    activeProject = projectNameValue;
    saveProjects(projects);
    renderProjects();
    document.querySelector('#project-name').value = '';
}
