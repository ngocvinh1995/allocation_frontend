import React, { Component } from 'react';
import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import { leaveActions } from '../_actions/leave.actions';
import Pagination from '../_components/PaginationComponentGoogle';
import convertData from '../_convertData/convertData.js';
import TableComponent from '../_components/TableComponent/TableComponent';
import Button from '../_components/Button';
import {AddComponent} from '../_components/AddComponent/AddComponent';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { mypageActions } from '../_actions/mypage.actions';
import SelectListComponent from '../_components/SelectListComponent';

class MyLeave extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            loading: true,
            pages:0,
            page: 1,
            sizePerPage:10,
            status:1,
            pageOfItems: [],
            isFirst: true,
            bool:''
        };

        // this.onChangePage  = this.onChangePage.bind(this);
        this.openAdd = this.openAdd.bind(this);
        
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData(page,pageSize,bool,status){
        if(status === undefined) status = this.state.status;
        if(page === undefined) page =this.state.page;
        if(pageSize === undefined) pageSize = this.state.sizePerPage;
        if(bool === undefined) bool = this.state.bool;
        if(this.state.isFirst){
            this.props.dispatch(leaveActions.getLeaveInit(page,pageSize,this.state.sorted,bool,status));
            this.setState({isFirst: false})
        }else{
            this.props.dispatch(leaveActions.getLeaveByPage(page,pageSize,this.state.sorted,bool,status));
        }

    }
    onChangePage(page,sizePage) {
        // alert(page);
        if(page)
            this.fetchData(page,sizePage);
    }

    openAdd(){
        let leave = {};
        if(this.props.projectList.length > 0){
            leave.project_id = this.props.projectList[0].project_id;
            // leave.projectName = this.props.projectList[0].name;
        }
        if(this.props.leaveTypeList.length > 0){
            leave.vacation_type = this.props.leaveTypeList[0].vacation_type_id;
            // overtime.otherType = this.props.overtimeTypeList[0].name;
        }
        this.setState({leave:leave});
        this.props.dispatch(mypageActions.openPopup());
    }
    

    handleDelete(value){
        console.log(value + " deleted");
        const options = {
            title: <i className="fa fa-trash" aria-hidden="true"></i>,
            message: 'Are you sure to delete this',
            buttons: [
              {
                label: 'Delete',
                onClick: () => this.props.dispatch(leaveActions.deleteLeave(value))
              },
              {
                label: 'Cancel'
              }
            ]
          };
          confirmAlert(options);
    }
    
    handleEdit(data){
        this.props.dispatch(mypageActions.openPopup());
        this.setState({
            leave:data
        })
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
    onStatusChange(e){
        let page;
        let pageSize;
        let status;
        let bool;
        if(Number(e.target.value)===0) //New
        {
                status=1;
                bool='';
        }
        if(Number(e.target.value)===1) //Approving
        {
                status=2,3,4,5,6;
                bool='false';
        }
        if(Number(e.target.value)===2) //Approved
        {
                status=2,3,4,5,6;
                bool='true';
        }
        if(Number(e.target.value)===-1) // Disapproved
        {
                status=-1;
                bool='false';
        }
        this.fetchData(page,pageSize,bool,status);
    }


    render(){
        const {leaveList,pages,loading,isOpen}  = this.props;
        const {projectList,leaveTypeList,projectListByEmp} = this.props;
        const {pageOfItems} = this.state;
        let pageTmp = [];
        for(let i = 0 ;i < pages;i++){
            pageTmp.push(i+1)
        }
        let projectData = [];
        if(projectListByEmp){
            for(let i=0; i<projectListByEmp.length;i++){
                projectData.push({"name":this.convertProjectName(projectListByEmp[i]),"value":projectListByEmp[i]}); 
            }
        }
        let selectTypeData = [
            {
                "name":"New",
                "value":0
            },
            {
                "name":"Approving",
                "value":1
            },
            {
                "name":"Aprroved",
                "value":2
            },
            {
                "name":"Disaprroved",
                "value":-1
            }
        ]
        return(
            

            <div>
                <NavBar/>
                <Header/>
            <div className="right_col" role="main">
                <div className="row">
                    <div className="col-md-6">
                        {isOpen && <AddComponent leave={this.state.leave}/>}
                                <Button type="button" btn="warning" onClick={this.openAdd}>Add New</Button>
                    </div>
                    <div className="col-md-6">
                        <SelectListComponent style={{"width": "20%","float":"right"}} option={selectTypeData} onChange={this.onStatusChange.bind(this)}/>
                    </div>
                </div>
                {leaveList && 
                    <TableComponent data = {convertData(leaveList,["Project","Type","From Date","To Date","Description"],['project_id','vacation_type','from_date','to_date','description'],'vacation_id')} 
                    isCrud={true} onDelete={this.handleDelete.bind(this)} onEdit={this.handleEdit.bind(this)}/>}
                    
                    <Pagination items={leaveList} pages={pages} onChangePage={this.onChangePage.bind(this)}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { leaveList,pages, loading } = state.leaves;
    const { isOpen } = state.popup;
    const {projectList,leaveTypeList,projectListByEmp} = state.leaveCategory;
  
    return {
        leaveList,
        loading,
        pages,
        isOpen,
        projectList,
        leaveTypeList,
        projectListByEmp
    };
}

const connectedLeave = connect(mapStateToProps)(MyLeave);
export { connectedLeave as MyLeave };