import React from 'react'
import DashboardNotificationComponent from '../_components/DashboardNotificationComponent';
import PropTypes from 'prop-types';
import styles from './css/component.css';
class BlockDashboardNotificationComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div className={'col-lg-12 col-md-12 col-xs-12 '+styles.block_dashboard }>
        <div className="col-lg-12 col-md-12 col-xs-12">
          <strong style={{fontSize:'40px',color:'#339966'}}>{this.props.text}</strong>
        </div>

        <DashboardNotificationComponent text="New" color="primary"/>

        <DashboardNotificationComponent text="Approving" color="warning"/>

        <DashboardNotificationComponent text="Approved" color="success"/>

        <DashboardNotificationComponent text="UnApprove" color="danger"/>

      </div>
    );
  }
}

BlockDashboardNotificationComponent.propTypes = {
  text:PropTypes.string.isRequired
}


export default BlockDashboardNotificationComponent;
