import {projectConstants} from '../_constants/project.constants';

export function project(state = {},action){
    switch(action.type){
        case projectConstants.GETAL_REQUEST:
            return {
                loading: true
            };
        case projectConstants.GETAL_SUCCESS:
            return{
                loading: false,
                projectList: action.projectBean.data,
                pages: action.projectBean.pages
            }
        case projectConstants.GETAL_FAILURE:
            return{
                loading: false,
                error: action.error
            }

        case projectConstants.UPDATE_SUCCESS:
            let isFind = false;
            let projectOldList = state.projectList;
            const projectNewList = [];
            for(var i = 0 ;i < projectOldList.length; i++){
                if(projectOldList[i].id == action.project.id){
                    isFind = true;
                    projectNewList.push(action.project);
                }else{
                    projectNewList.push(projectOldList[i]);
                }
            }
            if(!isFind){
                projectNewList.push(action.project);
            }

            return {
                projectList: projectNewList,
            };
        case projectConstants.ADD_SUCCESS:
            let is = false;
            let projectaddList = state.projectList;
            const projectNewwList = [];
            for(var i = 0 ;i < projectaddList.length; i++){
                if(projectaddList[i].id == action.project.id){
                    is = true;
                    projectNewwList.push(action.project);
                }else{
                    projectNewwList.push(projectaddList[i]);
                }
            }
            if(!is){
                projectNewwList.push(action.project);
            }

            return {
                projectList: projectNewwList,
            };

        case projectConstants.DELETE_PROJECT_SUCCESS:
            let projectList = state.projectList;
            let projectDelete = [];
      
            for (var i = 0 ;i < projectList.length;i++) {
              if(projectList[i].id != action.id){
                projectDelete.push(projectList[i]);
              }
            }
            state.projectList = projectDelete;
            return {
                projectList: projectDelete
            };
        default:
            return state;
    }

}