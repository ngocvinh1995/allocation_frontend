import { authHeader } from '../_helpers/auth-header.js';
import { systemConstants } from '../_constants/system.constants.js';


export const leaveService = {
    getLeaveByPage,
    deleteLeave,
    getCategory,
    saveLeave
};

function getLeaveByPage(page,pageSize,sorted,bool,status){
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };
    let url = systemConstants.API_URL + "/api/vacations/employee?page="+page+"&pageSize="+pageSize+"&is_approved="+bool+"&status="+status;
    if(sorted && sorted.id && sorted.desc){
        url += '&sortedColumn='+sorted.id; + '&desc='+sorted.desc;
    }
    
    return fetch(url,requestOptions).then(handleResponse);

}

function getCategory(){
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };
    let url = systemConstants.API_URL+"/api/vacations/category";
    return fetch(url,requestOptions).then(handleResponse);
}

function saveLeave(leave) {
    // let dateClone = leave.overtimeDate;
    let contentType = { 'Content-Type': 'application/json' };
    const requestOptions = {
        method: 'POST',
        headers: {...contentType,...authHeader()},
        body: JSON.stringify(leave)
    };

    return fetch(systemConstants.API_URL + '/api/vacations', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();

        });
}


function deleteLeave(id){
    const requestOptions = {
        method: "DELETE",
        headers: authHeader()
    };
    return fetch(systemConstants.API_URL+"/api/vacations/"+id,requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}
