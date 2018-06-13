import {allocationConstants} from '../_constants/allocation.constants';

export function allocation(state = {},action){
    switch(action.type){
        case allocationConstants.GETALL_REQUEST_ALLOCATION:
            return {
                loading: true
            };
        case allocationConstants.GETALL_SUCCESS_ALLOCATION:
            return{
                loading: false,
                allocationList: action.allocationBean.data,
                pages: action.allocationBean.pages
            }
        case allocationConstants.GETALL_FAILURE_ALLOCATION:
            return{
                loading: false,
                error: action.error
            }
        
        default:
            return state;
    }

}