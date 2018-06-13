import React from 'react';
import TableHeader from './TableHeaderComponent';
import TableBody from './TableBodyComponent';

export default class TableComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={valueDelete:0,
        valueDetail:0}
    }
    
    
    handleDelete(value){
        //alert(value);
        this.props.onDelete(value);
        // this.setState({valueDelete: value});
    }
    valueEdit(value){
        this.props.onEdit(value);
    }

    handleDetail(value){
     
        this.props.onDetail(value);
   
    }
    
    render(){
        console.log("render table");
        const data = this.props.data;
        const {isCrud,handleDelete, isDetail}= this.props;
        return(
            <table className="table table-bordered table-hover">
                <TableHeader data={this.props.data} isCrud={this.props.isCrud} isDetail={this.props.isDetail}/>
                <TableBody data={this.props.data} isCrud={this.props.isCrud} isDetail={this.props.isDetail} valueDetail={this.handleDetail.bind(this)} valueDelete={this.handleDelete.bind(this)} valueEdit={this.valueEdit.bind(this)}/>

        
            </table>
        )
    }
}