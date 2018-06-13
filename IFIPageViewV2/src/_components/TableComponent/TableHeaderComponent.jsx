import React from 'react';
import InputComponent from '../InputComponent';

export default class HeaderComponent extends React.Component{

    constructor(props){
        super(props);
        this.handleColumnClick = this.handleColumnClick.bind(this);
        this.colIndex = this.props.colIndex;
        this.idTable = this.props.idTable;
        this.icon = true;
    }


    handleColumnClick = (e) => {
        this.icon = !this.icon;
        console.log(this.icon);
        console.log(e.target.value);
        if(e.target.value != "on"){
        var n= parseInt(this.colindex);
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById(this.idTable);
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
       
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.getElementsByTagName("TR");
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                   
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount++;
            } else {
                /* If no switching has been done AND the direction is "asc",fa fa-fw fa-sort
                set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
        
     
        
        this.forceUpdate();
    }
    render(){
        const dataColumns = this.props.data.headerCol;
        const { check,icon } = this.props;
        const {isDetail}=this.props;
        const {isCrud,isCheckbox}=this.props;

        return(
            <thead>
                <tr>
                    {isCheckbox &&
                        <th>
                            <input type="checkbox"/>
                        </th>
                    }
                    {dataColumns && dataColumns.map(function(column,index){
                        return (<th  key={index}>
                            {column}
                            {check ?<i>
                    <span onClick={this.handleColumnClick} className={!this.icon ? "fa fa-sort-asc" : "fa fa-sort-desc"}></span>
                    </i>:''}</th>);
                    })}
                    {isDetail &&
                        <th>Detail</th>
                    }
                    {isCrud && 
                        <th>Edit</th>
                    }
                    {isCrud && 
                        <th>Delete</th>
                    }
                    
                </tr>
            </thead>
        )
    }
}