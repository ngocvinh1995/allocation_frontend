import { projectConstants } from '../_constants/project.constants.js';
import { ProjectService } from '../_services/project.service.js';
import { alertActions } from './alert.actions.js';

export const projectActions = {
    getProjectByPage,
    deleteProject,
    updateProject,
    getGroup,
    createProject,
    addProject
//    getProjectInit
};

function getProjectByPage(group_id,page,pageSize){
    return dispatch => {
        dispatch(request());
        ProjectService.getProjectByPage(group_id,page,pageSize).then(
            projectBean =>dispatch(success(projectBean)),
            error=>dispatch(failure(error))
        );
    };
        function request() {return {type: projectConstants.GETAL_REQUEST}}
        function success(projectBean) {return{type:projectConstants.GETAL_SUCCESS, projectBean}}
        function failure(error) {return {type:projectConstants.GETAL_FAILURE, error}}
}

// function getProjectInit(page,pageSize){
//     return function(dispatch){
//         return ProjectService.getCategory().then(
//             ProjectCategory => {
//                 dispatch(success(ProjectCategory));
//                 dispatch(getProjectByPage(page,pageSize));
//             },
//             error => dispatch(failure(error))
//         );
//     };
//     function success(leaveCategory) {return {type: projectConstants.GET_LEAVE_CATEGORY,leaveCategory}}
//     function failure(err) { return {type: projectConstants.GET_LEAVE_CATEGORY_FAILURE, err}}
// }

function getGroup(){
    return dispatch => {
        dispatch(request());
        ProjectService.getGroup().then(
            groupBean =>dispatch(success(groupBean)),
            error=>dispatch(failure(error))
        );
    };
        function request() {return {type: projectConstants.GETAL_REQUEST}}
        function success(groupBean) {return{type:projectConstants.GETAL_SUCCESS, groupBean}}
        function failure(error) {return {type:projectConstants.GETAL_FAILURE, error}}
}

function updateProject(project) {
    return dispatch => {
        //dispatch(request());
        ProjectService.updateProject(project).then(
            project=>dispatch(success(project)),
        );
    };

    //function request() { return { type: overtimeConstants.GETALL_REQUEST } }
    function success(project) {
      return { type: projectConstants.UPDATE_SUCCESS, project }
    }
    //function failure(error) { return { type: overtimeConstants.GETALL_FAILURE, error } }
}

function addProject(project) {
    return dispatch => {
        //dispatch(request());
        ProjectService.addProject(project).then(
            project=>dispatch(success(project)),
        );
    };

    //function request() { return { type: overtimeConstants.GETALL_REQUEST } }
    function success(project) {
      return { type: projectConstants.ADD_SUCCESS, project }
    }
    //function failure(error) { return { type: overtimeConstants.GETALL_FAILURE, error } }
}

function createProject(project) {
    return dispatch => {
        //dispatch(request());
        ProjectService.createProject(project).then(
            project=>dispatch(success(project)),
        );
    };

    //function request() { return { type: overtimeConstants.GETALL_REQUEST } }
    function success(project) {
      return { type: projectConstants.CREATE_SUCCESS, project }
    }
    //function failure(error) { return { type: overtimeConstants.GETALL_FAILURE, error } }
}

function deleteProject(id){
    return dispatch => {
        dispatch(request());
        ProjectService.deleteProject(id).then(
            () => {
                dispatch(success());
                dispatch(alertActions.success('Delete Successfully'));
            },
            error => dispatch(failure(error))
        );
    }

    function request(){return {type: projectConstants.DELETE_PROJECT_REQUEST}}
    function success(id){return {type: projectConstants.DELETE_PROJECT_SUCCESS,id}}
    function failure(error){return {type: projectConstants.DELETE_PROJECT_FAILURE, error}}
}