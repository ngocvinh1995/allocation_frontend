import React , {Component} from 'react';
import './css/component.css';
import EmployeeAddProject from './EmployeeAddProject';
import { connect } from 'react-redux';
import {mypageActions} from '../_actions/mypage.actions';
import convertData from '../_convertData/convertData.js';

class DragDropComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
              tasks: [
                {name:"Nhan vien A",category:"wip",id:4},
                {name:"Nhan Vien B", category:"complete",id:5},
                {name:"Nhan Vien C", category:"complete" ,id:3}
              ]
            
        }
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {   
        
        ev.preventDefault();
          
    }
    
    onDrop = (ev, cat ) => {
       this.props.dispatch(mypageActions.openPopup()); 
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
       
           if (task.name == id) {
               task.category = cat;
           }

           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }

    render(){
        var tasks = {
            wip: [],
            complete: []
        }

        this.state.tasks.forEach ((t , index ) => {
            tasks[t.category].push(
                <div key={t.id} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable >
                   {t.name}
                </div>
            );
            
        });
        const {isOpen} = this.props;
        
        // const data = convertData(this.state.tasks,["id","name","idp"],[]);
        // const dataRows = data.rows;
        // const dataColumns = data.columns;
        return(
            
          <div>
              {isOpen && <EmployeeAddProject />}
            <h2>Employee Add Project</h2>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                        onDragOver={(e)=>this.onDragOver(e)}
                        onDrop={(e)=> this.onDrop(e, "wip")} >
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title text-center" 
                                >
                                Danh sach nhan vien trong du an
                            </h3>
                            </div>
                                <div className="panel-body">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.wip}
                                    {/* {this.state.tasks1.map(function(row , index){
                                        return(
                                            <tr key={index} colindex={index+1}>
                                            {dataColumns.map(function(column,index){
                                                return <td key={index}><div className="brief-text">{row}</div></td>;
                                            })}
                                            </tr>);
                                    }.bind(this))} */}
                                    </tbody>
                                </table>
                              </div>
                            </div>
                        </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e, "complete")}>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title text-center" 
                        >
                        Danh sach nhan vien chua tham gia
                        </h3>
                    </div>
                    <div className="panel-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                  
                                    <th className="text-center">Tên</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.complete}
                            </tbody>
                          
                        </table>
                    </div>
                </div>
            </div>

        </div>
        );
    }
}
function mapStateToProps(state) {
    const { isOpen } = state.popup;
  
    return {
        isOpen
    };
}

export default connect(mapStateToProps)(DragDropComponent);