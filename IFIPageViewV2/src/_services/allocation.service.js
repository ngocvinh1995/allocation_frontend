import { authHeader } from '../_helpers/auth-header.js';
import { systemConstants } from '../_constants/system.constants.js';


export const AllocationService = {
    getAllocationByPage

};
function getAllocationByPage(project_id,page, pageSize){
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };
    let url = systemConstants.API_URL + "/api/allocations/findAllocationByProjectID?project_id="+project_id+"&page="+page+"&pageSize="+pageSize;

    return fetch(url,requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}
