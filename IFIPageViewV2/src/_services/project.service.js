import { authHeader } from '../_helpers/auth-header.js';
import { systemConstants } from '../_constants/system.constants.js';


export const ProjectService = {
    getProjectByPage,
    deleteProject,
    updateProject,
    getGroup,
    addProject,
    getAllocationsByPage

};

function getProjectByPage(group_id,page, pageSize){
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };
    let url = systemConstants.API_URL + "/api/projects/ProjectsInGroup?group_id="+group_id+"&page="+page+"&pageSize="+pageSize;

    return fetch(url,requestOptions).then(handleResponse);
}
function getAllocationsByPage(page, pageSize,project_id){
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };
    let url = systemConstants.API_URL + "/api/allocations/findAllocationByProjectID?project_id="+project_id+"&page="+page+"&pageSize="+pageSize;

    return fetch(url,requestOptions).then(handleResponse);
}

function getGroup(){
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };
    let url = systemConstants.API_URL + "/api/groups?page=1&pageSize=10";

    return fetch(url,requestOptions).then(handleResponse);
}

function updateProject(project) {
    // let dateClone = leave.overtimeDate;
    let contentType = { 'Content-Type': 'application/json' };
    const requestOptions = {
        method: 'POST',
        headers: {...contentType,...authHeader()},
        body: JSON.stringify(project)
    };

    return fetch(systemConstants.API_URL + '/api/projects/updateProject', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();

        });
}

function addProject(project) {
    // let dateClone = leave.overtimeDate;
    let contentType = { 'Content-Type': 'application/json' };
    const requestOptions = {
        method: 'POST',
        headers: {...contentType,...authHeader()},
        body: JSON.stringify(project)
    };

    return fetch(systemConstants.API_URL + '/api/projects/create', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();

        });
}

function deleteProject(id){
    const requestOptions = {
        method: "POST",
        headers: authHeader()
    };
    return fetch(systemConstants.API_URL+"/api/projects/deleteProject?project_id="+id,requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}
