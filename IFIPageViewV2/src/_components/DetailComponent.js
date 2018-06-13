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

class DetailComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.closeIsDetail = this.closeIsDetail.bind(this);
       
    }
    closeIsDetail(){
        this.props.dispatch(mypageActions.closeIsDetail());
        //console.log(this.props.groupList);
    }
 
    render(){
        return(
            <div className="popup-mask">
            <div className="container-register-content col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title text-center" >
                          
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group col-md-3">
                                <label>Name Project :</label>
                                <InputComponentBoostrap />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Name Project :</label>
                                <InputComponentBoostrap />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Name Project :</label>
                                <InputComponentBoostrap />
                            </div>
                            
                            <div className="form-group">
                                <label>Start Date :</label>
                                 <DateTimeComponent /> 
                                
                            </div>
                            <div className="form-group">
                                <label>End Date :</label>
                                  <DateTimeComponent /> 
                                
                            </div>
                             <div className="form-group">
                                <label>Status :</label> 
                                    <SelectListComponent  /> 
                            </div> 
                            <div className="form-group">
                                <label>Description :</label>
                                 <InputComponentBoostrap  />
                            </div> 
                            <div className="text-center" >
                                 <Button type="submit" btn="primary" value="submit" >aaaaaaaa</Button> &nbsp;
                                <Button type="button" btn="warning" onClick={this.closeIsDetail} >Cancel</Button>
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

export default connect(mapStateToProps)(DetailComponent);