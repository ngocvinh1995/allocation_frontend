import { mypageConstants } from '../_constants/mypage.constants.js';

export const mypageActions={
    openPopup,
    closePopup,
    openIsDetail,
    closeIsDetail
};

function openPopup(){
    return {type: mypageConstants.OPEN_POPUP };
}
function closePopup(){
    return {type: mypageConstants.CLOSE_POPUP};
}
function closeIsDetail(){
    return {type: mypageConstants.CLOSE_IS_DETAIL};
}
function openIsDetail(){
    return {type: mypageConstants.OPPEN_IS_DETAIL};
}