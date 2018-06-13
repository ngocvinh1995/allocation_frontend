import React , {Component} from 'react';
import './css/component.css';
import EmployeeAddProject from './EmployeeAddProject';
import { connect } from 'react-redux';
import {mypageActions} from '../_actions/mypage.actions';
import convertData from '../_convertData/convertData.js';
import TableComponent from '../_components/TableComponent/TableComponent';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {alloactionActions } from '../_actions/allocations.action.js';

class AllocationComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pages:0,
            page: 1,
            sizePerPage:10,
            pageOfItems: [],
            isFirst: true,
            // project_id: 56
            
        };

        this.openAdd = this.openAdd.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }


    fetchData(project_id,page,pageSize){
        if(project_id === undefined) project_id =this.state.project_id;
        if(page === undefined) page =this.state.page;
        if(pageSize === undefined) pageSize = this.state.sizePerPage;
        
        // if(this.state.isFirst){
        //     this.props.dispatch(projectActions.getprojectInit(page,pageSize));
        //     this.setState({isFirst: false})
        // }else{
        //     this.props.dispatch(projectActions.getprojectByPage(page,pageSize));
        // }
        this.props.dispatch(alloactionActions.getAllocationByPage(56,page,pageSize));
       

    }


    // handleEdit(data){
    //     this.props.dispatch(mypageActions.openPopup());
    //     this.setState({
    //         project:data
    //     })
    // }

    // handleDetail(id){
    //     this.props.dispatch(mypageActions.openIsDetail());
    // }

    // handleDelete(value){
    //     console.log(value + " deleted");
    //     const options = {
    //         title: <i className="fa fa-trash" aria-hidden="true"></i>,
    //         message: 'Are you sure to delete this',
    //         buttons: [
    //           {
    //             label: 'Delete',
    //             onClick: () => this.props.dispatch(allocationActions.deleteProject(value))
    //           },
    //           {
    //             label: 'Cancel'
    //           }
    //         ]
    //       };
    //       confirmAlert(options);
    // }
   

    onChangePage(page,sizePage) {
        // alert(page);
        if(page){
            this.fetchData(page,sizePage);
        }
           
    }

    openAdd(event){
        let allocation = {};
        if(this.props.allocationList.length > 0){
            allocation.project_id = this.props.allocationtList[0].project_id;
        }
        // let group = {};
        // if(this.props.groupList.length > 0){
        //     group.group_id = this.props.groupList[0].group_id;
        // }

        this.setState({
            allocation:allocation
            // group:group
        });
        this.props.dispatch(mypageActions.openPopup());
    }
   

  
    render(){
        const {allocationList,pages,loading,isOpen ,groupList, isDetail}  = this.props;
       
        return(
            
          <div>
             
            <h2>Employee Add Project</h2>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title text-center" 
                                >
                                Danh sach nhan vien trong du an
                            </h3>
                            </div>
                                <div className="panel-body">
                                {allocationList && 
                                <TableComponent data = {convertData(allocationList,["Project","abc","Group","Start Date","End Date","Description"],['employee_id','allocation_plan','start_date','end_date','employee_Name','project_Name'],'project_id')} 
                                 isCrud={true} isDetail={true}/>}
                              </div>
                            </div>
                        </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title text-center" 
                        >
                        Danh sach nhan vien chua tham gia
                        </h3>
                    </div>
                    <div className="panel-body">
                    {/* {allocationList && 
                                <TableComponent data = {convertData(allocationList,["Project","Name","Group","Start Date","End Date","Description"],['project_id','name',"group_id",'start_date','end_date','description'],'project_id')} 
                                 isCrud={true} isDetail={true} />} */}
                    </div>
                </div>
            </div>

        </div>
        );
    }
}
function mapStateToProps(state) {
    const { isOpen } = state.popup;
    const { allocationList,pages, loading } = state.allocation;
  
    return {
        isOpen,
        allocationList,
        loading,
        pages

    };
}

export default connect(mapStateToProps)(AllocationComponent);