import {  allocationConstants } from '../_constants/allocation.constants.js';
import { AllocationService } from '../_services/allocation.service';


export const alloactionActions = {
    getAllocationByPage,
    
};

function getAllocationByPage(project_id,page,pageSize){
    return dispatch => {
        dispatch(request());
        AllocationService.getAllocationByPage(project_id,page,pageSize).then(
            allocationBean =>dispatch(success(allocationBean)),
            error=>dispatch(failure(error))
        );
    };
        function request() {return {type: allocationConstants.GETALL_REQUEST_ALLOCATION}}
        function success(allocationBean) {return{type: allocationConstants.GETALL_SUCCESS_ALLOCATION, allocationBean}}
        function failure(error) {return {type: allocationConstants.GETALL_FAILURE_ALLOCATION, error}}
}
