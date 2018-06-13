import React from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import styles from './css/style.css';
import InputComponent from '../_components/InputComponent';
import Button from '../_components/Button';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';

import DatePickerComponent from '../_components/DatePickerComponent';

import BlockDashboardNotificationComponent from '../_components/BlockDashboardNotificationComponent';


import TableHeaderComponent from '../_components/TableHeaderComponent';
import TableBody from '../_components/TableBody';

import BlockDashboard from '../_components/BlockDashboardNotificationComponent';
import SelectListComponent from '../_components/SelectListComponent';
import DateTimeComponent from '../_components/DateTimeComponent';

import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import Footer from '../TemplatePage/Footer';
import { history } from '../_helpers/history.js';
import { alertActions } from '../_actions/alert.actions.js';
import {mypageActions} from '../_actions/mypage.actions.js';

import './css/custom.js';
import {Home} from '../Pages/Home';
import {MyLeave} from '../Pages/MyLeave';
import {Login} from '../Pages/Login';
import $ from 'jquery';
import ProjectManager from '../Pages/ProjectManager';
import EmployeeManager from '../Pages/EmployeeManager';


class App extends React.Component {

    constructor(props){

        history.push("/login");


        super(props);
        this.state = {

            rows: [],
            columns: [],
            clicked: false
        };
        $('#alert_fade').fadeIn(1000).delay(2000).fadeOut(2000);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
        this.handleLogin=this.handleLogin.bind(this);
    }

    handleLogin(){
       
        this.props.dispatch(mypageActions.openPopup());
       
    };
    render() {

        const {isOpen} = this.props;

        const basePath = '/' + window.location.pathname.split('/')[1];
        console.log(basePath);

        const styleButton = {
            height: "40px", color: "yellow", width: "10%" ,fontSize: "20px" ,background:"green" ,borderradius:"10px"
        };
        const styleHeaderTable={
            height: "40px", color: "#ffff", width: "100px", fontSize: "15px", background: "#23527C"
        };

        
        return (
            // <div>
                 
            //     <button type="button"  onClick={this.handleLogin} {...styleButton}>
            //         Login
            //     </button>
            //     {isOpen && <div><h1>Hello</h1></div>}
            //  </div>			
            <div>
                {alert.message &&
                    <div className={`alert ${alert.type}`} id="alert_fade">{alert.message}</div>
                }
                <Router history={history}>

                    <div>
                            <Route exact path="/home"  component={Home} />
                            <Route exact path="/"  component={Home} />
                            <Route path="/login"  component={Login} />
                            <Route path="/pages/leave" component={MyLeave} />
                            <Route path="/pages/project" component={ProjectManager} />
                            <Route path="/pages/employee" component={EmployeeManager} />
                    </div>
				</Router>
			</div>


        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    const { isOpen } = state.popup;
    return {
        alert,
        isOpen,
    };
}


const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
