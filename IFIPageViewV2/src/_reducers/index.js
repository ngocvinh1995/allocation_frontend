import { combineReducers } from 'redux';
import {project} from './project.reducer'
import {leaves} from './leave.reducer';
import {popup} from './popup.reducer';
import {users} from './user.reducer';
import {authentication} from './authentication.reducer';
import {leaveCategory} from './leaveType.reducer';
import {group} from './group.reducer';
import {allocation} from './allocation.reducer';
import {alert} from './alert.reducer';


const rootReducer = combineReducers({
  popup,
  leaves,
  project,
  users,
  authentication,
  leaveCategory,
  alert,
  group,
  allocation
});

export default rootReducer;
