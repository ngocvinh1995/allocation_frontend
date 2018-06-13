import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import SelectListComponent from './SelectListComponent';
import InputComponentBoostrap from './InputComponentBootstrap';
import DateTimeComponent from './DateTimeComponent';
import {mypageActions} from '../_actions/mypage.actions'; 


class EmployeeAddProject extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            
        }
        this.closePopup = this.closePopup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(e){
        this.setState({email: e.target.value})
    }
    
    closePopup(){
        this.props.dispatch(mypageActions.closePopup());
    }
    addEmployee(event){
        event.preventDefault();
        this.props.dispatch(mypageActions.closePopup());
    }

    render(){
        var status =['Online' , 'Offline'];
        var gradelevel =['Grade Level 1' ,'Grade Level 2','Grade Level 3' ];
        let{validForm} = this.state;
        return(
            <div className="popup-mask">
            <div className="container-register-content col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title text-center" >
                          Employee Add Project
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit = {this.addEmployee}>
                            <div>
                                <label>Name Employee :</label>
                                <InputComponentBoostrap type="text" placeholder="Name Leader "  className="email" value={this.state.email} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Start Date :</label>
                                <DateTimeComponent />
                            </div>
                            <div className="form-group">
                                <label>End Date :</label>
                                <DateTimeComponent />
                            </div>
                            <div className="text-center" >
                             
                             <Button btn="primary"  type="button" disabled={!this.state.email} >Submit</Button>
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
    
  
    return {
        
    };
}

export default connect(mapStateToProps)(EmployeeAddProject);