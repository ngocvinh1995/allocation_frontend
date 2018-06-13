import React from 'react';
import { connect } from 'react-redux';
import InputComponent from '../InputComponent';
import SelectComponent from '../SelectListComponent';
import Button from '../Button';
import {mypageActions} from '../../_actions/mypage.actions';
import DateTimeComponent from 'react-datetime';
import moment from 'moment';
import { leaveActions } from '../../_actions/leave.actions';


class AddComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            leave: this.props.leave,
            startDateClone: this.props.leave.from_date,
            endDateClone: this.props.leave.to_date,
            showReason:false,
            validButton: false,
            from_date:'',
            to_date:''
        }
        this.closepopup = this.closepopup.bind(this);
        this.addLeave = this.addLeave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }
    closepopup(){
        this.props.dispatch(mypageActions.closePopup());
    }

    convertProjectName(projectId) {
        var name;
        if(projectId){
          for(var i = 0 ; i < this.props.projectList.length;i++){
            if(this.props.projectList[i].project_id == projectId){
              name = this.props.projectList[i].name;
              break;
            }
          }
        }
        return name;
    }

    addLeave(event){
        event.preventDefault();
        // this.state.overtime.otDate = this.state.startDateClone;
        const {leave} = this.state;
        this.props.dispatch(leaveActions.saveLeave(leave));
         this.props.dispatch(mypageActions.closePopup());
    }
    handleChange(e){
        const { name, value } = e.target;
      
       let leave = this.state.leave;

       leave[name] = value;
       this.setState({leave:leave});
      
        if(leave.vacation_type == 1)
            this.setState({showReason : false});
        else
            this.setState({showReason : true});
    
           
            
       
    }

    handleStartDateChange(data) {
        let leave = this.state.leave;
        leave["from_date"] = moment(data).format('MM/DD/YYYY hh:mm a');
        this.setState({
            leave:leave
        });
    }
    handleEndDateChange(data){
        let leave = this.state.leave;
        leave["to_date"] = moment(data).format('MM/DD/YYYY hh:mm a');
        this.setState({
            leave:leave
        });
    }

    render(){
        const {leave} = this.props;
        const {projectListByEmp,leaveTypeList} = this.props;
        let {showReason,validButton}=this.state;
        let projectData = [];
        if(projectListByEmp){
            for(let i=0; i<projectListByEmp.length;i++){
                projectData.push({"name":this.convertProjectName(projectListByEmp[i]),"value":projectListByEmp[i]}); 
            }
        }
        let typeData = [];
        if(leaveTypeList){
            for(let i=0; i<leaveTypeList.length;i++){
                typeData.push({"name":leaveTypeList[i].name,"value":leaveTypeList[i].vacation_type_id}); 
              
            }
        }

        return(
            <div className="popup-mask">
                <div className="container-register-content col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title text-center">Form</h3>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.addLeave}>
                                <div className="form-group">
                                    <label>Project :</label>
                                    <SelectComponent option={projectData} valueSelect={leave.project_id} onChange={this.handleChange} name="project_id"/>
                                    
                                </div>
                                <div className="form-group">
                                    <label>From :</label>
                                    <DateTimeComponent onChange={this.handleStartDateChange} value={leave.from_date} closeOnSelect={true} name="from_date"/>
                                </div>
                                <div className="form-group">
                                    <label>To :</label>
                                    <DateTimeComponent onChange={this.handleEndDateChange} value={leave.to_date} closeOnSelect={true} name="to_date"/>
                                </div>
                                <div className="form-group">
                                    <label>Type :</label>
                                    <SelectComponent option={typeData} valueSelect={leave.vacation_type} onChange={this.handleChange} name="vacation_type"/>
                                    {showReason}
                                </div>
                                    {showReason &&
                                        <div className="form-group">
                                            <label>Description :</label>
                                            <textarea className="form-control" rows="5" value={leave.description} onChange={this.handleChange} name="description"></textarea>
                                        </div>

                                }
                               
                                <br/>
                                <div className="text-center">
                               
                                    <Button id="submit" type="submit"  value="submit" btn="primary" >{leave.vacation_id != undefined ? "Update" : "Add"}</Button>
                              
                                    <Button type="button" btn="warning" onClick={this.closepopup}>Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {projectList,leaveTypeList,projectListByEmp} = state.leaveCategory;
  
    return {
        projectList,
        leaveTypeList,
        projectListByEmp
    };
}

const connectedAdd = connect(mapStateToProps)(AddComponent);
export { connectedAdd as AddComponent };