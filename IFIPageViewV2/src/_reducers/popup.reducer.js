import { mypageConstants } from '../_constants/mypage.constants.js';

export function popup(state = {}, action){
    switch(action.type){
        case mypageConstants.OPEN_POPUP:
            return{
                isOpen:true
            };
        case mypageConstants.CLOSE_POPUP:
            return{
                isOpen:false
            };
        case mypageConstants.OPPEN_IS_DETAIL:
            return{
                isDetail:true
            };
        case mypageConstants.CLOSE_IS_DETAIL:
            return{
                isDetail:false
            };
        default:
            return state
    }
}