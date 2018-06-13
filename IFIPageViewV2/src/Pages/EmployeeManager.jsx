import React, { Component } from 'react';
import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import { Router, Route } from 'react-router';
import DragDropComponent from '../_components/DragDropComponent';

export default class EmployeeManager extends React.Component{
    render(){
        return(
            <div>
                <NavBar/>
                <Header/>
                <div className="right_col" role="main">
                        <DragDropComponent />
                </div>
            </div>
        )
    }
}