import { leaveConstants } from '../_constants/leave.constants.js';
import { leaveService } from '../_services/leave.service.js';
import { alertActions } from './alert.actions.js';

export const leaveActions = {
    getLeaveByPage,
    deleteLeave,
    getLeaveInit,
    saveLeave
};

function getLeaveByPage(page,pageSize,sorted,bool,status){
    return dispatch => {
        dispatch(request());
        leaveService.getLeaveByPage(page,pageSize,sorted,bool,status).then(
            leaveBean => dispatch(success(leaveBean)),
            error => dispatch(failure(error))
        );
    };

    function request() {return  {type: leaveConstants.GETALL_REQUEST}}
    function success(leaveBean) { return {type: leaveConstants.GETALL_SUCCESS,leaveBean}}
    function failure(error) { return {type: leaveConstants.GETALL_FAILURE, error}}
}

function getLeaveInit(page,pageSize,sorted,bool,status){
    return function(dispatch){
        return leaveService.getCategory().then(
            leaveCategory => {
                dispatch(success(leaveCategory));
                dispatch(getLeaveByPage(page,pageSize,sorted,bool,status));
            },
            error => dispatch(failure(error))
        );
    };
    function success(leaveCategory) {return {type: leaveConstants.GET_LEAVE_CATEGORY,leaveCategory}}
    function failure(err) { return {type: leaveConstants.GET_LEAVE_CATEGORY_FAILURE, err}}
}

function saveLeave(leave) {
    return dispatch => {
        //dispatch(request());

        leaveService.saveLeave(leave)
            .then(
                leave => dispatch(success(leave)),
                //error => dispatch(failure(error))
            );
    };

    //function request() { return { type: overtimeConstants.GETALL_REQUEST } }
    function success(leave) {
      return { type: leaveConstants.SAVE_SUCCESS, leave }
    }
    //function failure(error) { return { type: overtimeConstants.GETALL_FAILURE, error } }
}

function deleteLeave(id){
    return dispatch => {
        dispatch(request());
        leaveService.deleteLeave(id).then(
            () => {
                dispatch(success());
                dispatch(alertActions.success('Delete Successfully'));
            },
            error => dispatch(failure(error))
        );
    }

    function request(){return {type: leaveConstants.DELETE_LEAVE_REQUEST}}
    function success(id){return {type: leaveConstants.DELETE_LEAVE_SUCCESS,id}}
    function failure(error){return {type: leaveConstants.DELETE_LEAVE_FAILURE, error}}
}

