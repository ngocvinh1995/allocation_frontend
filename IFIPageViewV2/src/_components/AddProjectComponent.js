import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import SelectListComponent from './SelectListComponent';
import InputComponentBoostrap from './InputComponentBootstrap';
import DateTimeComponent from './DateTimeComponent';
import {mypageActions} from '../_actions/mypage.actions';
import moment from 'moment';
import { projectActions  } from '../_actions/project.actions';
import DatePickerComponent from './DatePickerComponent';

class AddProject extends React.Component{
    constructor(props){
        super(props);
        this.state={
            project: this.props.project,
            group: this.props.group,
            startDateClone: this.props.project.start_date,
            endDateClone: this.props.project.end_date,
            showReason:false,
            validButton: false,
            from_date:'',
            to_date:''
            
        }
        this.closePopup = this.closePopup.bind(this);
        this.addProject = this.addProject.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }
    closePopup(){
        this.props.dispatch(mypageActions.closePopup());
        //console.log(this.props.groupList);
    }

    addProject(event){
        event.preventDefault();
        // this.state.overtime.otDate = this.state.startDateClone;
        const {project} = this.state;
        if(project.project_id != undefined ){
            this.props.dispatch(projectActions.updateProject(project));
        } else{
            this.props.dispatch(projectActions.addProject(project));
        }
        this.props.dispatch(mypageActions.closePopup());
         
    }
    
    handleChange(e){
        const { name, value } = e.target;
      
       let project = this.state.project;

       project[name] = value;
       this.setState({project:project});
       
    }

    handleStartDateChange(data){
        let project = this.state.project;
        project["start_date"] = moment(data).format('YYYY-MM-DD');
        this.setState({
            project:project
        });
    }
    handleEndDateChange(data){
        let project = this.state.project;
        project["end_date"] = moment(data).format('YYYY-MM-DD');
        this.setState({
            project:project
        });
    }
   
    render(){
        const {project,groupList,projectList} = this.props;
        const {showReason, validButton} = this.state;
        let projectData = [];
        if(groupList){
            projectData.push({"name":"Chọn Khối","value":"N1"}); 
            for(let i=0; i<groupList.length;i++){
                projectData.push({"name":groupList[i].name,"value":groupList[i].group_id}); 
              
            }
        }
        let selectStatusData =[
        {
            "name":"Chon",
            "value":0
        },
        {
            "name":"Online",
            "value":true
        },
        {
            "name":"offLine",
            "value":false
        }]
        return(
            <div className="popup-mask">
            <div className="container-register-content col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title text-center" >
                          
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.addProject} >
                            <div className="form-group">
                                <label>Name Project :</label>
                                 <InputComponentBoostrap value={project.name} onChange={this.handleChange} name="name" />
                            </div>
                            <div>
                            <div className="form-group">
                                <label>Grade Level :</label> 
                                    <SelectListComponent option={projectData} valueSelect={project.group_id} onChange={this.handleChange} name="group_id" />
                        
                            </div>
                            </div>
                            <div className="form-group">
                                <label>Start Date :</label>
                                 <DateTimeComponent onChange={this.handleStartDateChange} value={project.start_date} closeOnSelect={true} name ="start_date"/> 
                                
                            </div>
                            <div className="form-group">
                                <label>End Date :</label>
                                  <DateTimeComponent onChange={this.handleEndDateChange} value={project.end_date} closeOnSelect={true} name ="end_date" /> 
                                
                            </div>
                             <div className="form-group">
                                <label>Status :</label> 
                                    <SelectListComponent option={selectStatusData} valueSelect={project.status} onChange={this.handleChange} name="status" /> 
                            </div> 
                            <div className="form-group">
                                <label>Description :</label>
                                 <InputComponentBoostrap value={project.description} onChange={this.handleChange} name="description" />
                            </div> 
                            <div className="text-center" >
                                 <Button type="submit" btn="primary" value="submit" >{project.project_id != undefined ? "Update" : "Add"}</Button> &nbsp;
                                <Button type="button" btn="warning" onClick={this.closePopup} >Cancel</Button>
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {groupList,projectList} = state.group;
  
    return {
        groupList,
        projectList
    };
}

export default connect(mapStateToProps)(AddProject);