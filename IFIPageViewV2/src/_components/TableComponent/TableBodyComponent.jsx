import React from 'react';
import Button from '../Button';
import InputComponent from '../InputComponent';


export default class TableBody extends React.Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDetail=this.handleDetail.bind(this);

    }
    handleDelete(id){
        // alert("delete " + id);
        this.props.valueDelete(id);
    }

    handleEdit(data){
        this.props.valueEdit(data);
    }

    handleDetail(id){
        this.props.valueDetail(id);
    }

    render(){
        const dataRows = this.props.data.rows;
        const dataColumns = this.props.data.columns;
        const {isCrud,isCheckbox,isDetail}=this.props;
        return(
            
            <tbody>
                
                {dataRows.map(function(row,index){
                    return(
                        <tr key={index} colindex={index+1}>
                            {isCheckbox && 
                                <td>
                                    <input type="checkbox"/>
                                </td>
                            }
                            {dataColumns.map(function(column,index){
                                return <td key={index}><div className="brief-text">{row[column]}</div></td>;
                            })}
                            {isDetail &&
                                  <td><Button type="button" btn="info" onClick={()=>this.handleDetail(row[this.props.data.indexId])} >Detail</Button></td>
                            }
                            {isCrud &&
                                  <td><Button type="button" onClick={() => this.handleEdit(row)}>Edit</Button></td>
                            }
                            {isCrud &&
                                <td><Button type="button" btn="success"  type="submit" onClick={() => this.handleDelete(row[this.props.data.indexId])}>Delete</Button></td>
                            }
                        </tr>);
                }.bind(this))}
            </tbody>
        );
    }
}