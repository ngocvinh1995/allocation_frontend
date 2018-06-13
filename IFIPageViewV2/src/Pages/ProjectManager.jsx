import React, { Component } from 'react';
import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import { projectActions } from '../_actions/project.actions.js';
import Pagination from '../_components/PaginationComponentGoogle';
import convertData from '../_convertData/convertData.js';
import TableComponent from '../_components/TableComponent/TableComponent';
import Button from '../_components/Button';
import {mypageActions} from '../_actions/mypage.actions'; 
import { confirmAlert } from 'react-confirm-alert'; // Import
import InputComponentBoostrap from '../_components/InputComponentBootstrap';
import SelectListComponent from '../_components/SelectListComponent';
import AddProject from '../_components/AddProjectComponent';
import { groupActions } from '../_actions/group.action';
import DetailComponent from '../_components/DetailComponent';


class ProjectManager extends React.Component{
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
            group_id:"N1"
        };
        
        this.openAdd = this.openAdd.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }


    fetchData(group_id,page,pageSize){
        if(group_id === undefined) group_id =this.state.group_id;
        if(page === undefined) page =this.state.page;
        if(pageSize === undefined) pageSize = this.state.sizePerPage;
        
        // if(this.state.isFirst){
        //     this.props.dispatch(projectActions.getprojectInit(page,pageSize));
        //     this.setState({isFirst: false})
        // }else{
        //     this.props.dispatch(projectActions.getprojectByPage(page,pageSize));
        // }
        this.props.dispatch(projectActions.getProjectByPage(group_id,page,pageSize));
        this.props.dispatch(groupActions.getGroup());

    }


    handleEdit(data){
        this.props.dispatch(mypageActions.openPopup());
        this.setState({
            project:data
        })
    }

    handleDetail(id){
        this.props.dispatch(mypageActions.openIsDetail());
    }

    handleDelete(value){
        console.log(value + " deleted");
        const options = {
            title: <i className="fa fa-trash" aria-hidden="true"></i>,
            message: 'Are you sure to delete this',
            buttons: [
              {
                label: 'Delete',
                onClick: () => this.props.dispatch(projectActions.deleteProject(value))
              },
              {
                label: 'Cancel'
              }
            ]
          };
          confirmAlert(options);
    }
   

    onChangePage(page,sizePage) {
        // alert(page);
        if(page){
            this.fetchData(page,sizePage);
        }
           
    }

    openAdd(event){
        let project = {};
        // if(this.props.projectList.length > 0){
        //     project.name = this.props.projectList[0].name;
        // }
        let group = {};
        if(this.props.groupList.length > 0){
            group.group_id = this.props.groupList[0].group_id;
        }

        this.setState({
            project:project,
            group:group
        });
        this.props.dispatch(mypageActions.openPopup());
    }
    onGroupChange(e){
        let page;
        let pageSize;
        let group_id;
        if(Number(e.target.value)===0) //New
        {
            group_id="N1";
        }
        if(Number(e.target.value)===1) //Approving
        {
            group_id="N2";
        }
        if(Number(e.target.value)===2) //Approved
        {
            group_id="N3";
        }
        if(Number(e.target.value)===3) // Disapproved
        {
            group_id="N4";
        }
        this.fetchData(group_id,page,pageSize);
    }

    render(){
        const {projectList,pages,loading,isOpen ,groupList, isDetail}  = this.props; 
        const {pageOfItems} = this.state;
        let projectData = [];
        if(groupList){
            for(let i=0; i<groupList.length;i++){
                projectData.push({"name":groupList[i].name,"value":groupList[i].group_id}); 
              
            }
        }

        let selectTypeData = [
            
            {
                "name":"Khoi N1",
                "value":0
            },
            {
                "name":"Khoi N2",
                "value":1
            },
            {
                "name":"Khoi N3",
                "value":2
            },
            {
                "name":"Khoi N4",
                "value":3
            }
        ]

        return(
            <div>
                <NavBar/>
                <Header/>
                  <div >
                    <div className="right_col" role="main">
                        <div className="row">
                            {isDetail && <DetailComponent/>}
                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            {isOpen && <AddProject project={this.state.project} />}
                                <Button type="button" btn="success" onClick={this.openAdd} > Add Project </Button>
                                
                            </div>
                            <div className="col-md-6">
                        <SelectListComponent style={{"width": "20%","float":"right"}} option={selectTypeData} onChange={this.onGroupChange.bind(this)}/>
                    </div>
                        </div>
                                {projectList && 
                                <TableComponent data = {convertData(projectList,["Project","Name","Group","Start Date","End Date","Description"],['project_id','name',"group_id",'start_date','end_date','description'],'project_id')} 
                                 isCrud={true} isDetail={true} onDetail={this.handleDetail.bind(this)} onDelete={this.handleDelete.bind(this)} onEdit={this.handleEdit.bind(this)}/>}
                                
                                <Pagination items={projectList} pages={pages} onChangePage={this.onChangePage.bind(this)}/>
                               
                                         
                        </div>
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state) {
    const { isOpen , isDetail} = state.popup;
    const { projectList,pages, loading } = state.project;
    const {groupList} = state.group;
    return {
        isDetail,
        isOpen,
        projectList,
        loading,
        pages,
        groupList
    };
}

export default connect(mapStateToProps)(ProjectManager);