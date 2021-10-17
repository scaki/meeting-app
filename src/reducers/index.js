import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import modalReducer from './modal';
import meetingReducer from './meeting';
import drawerReducer from './drawer';
import userReducer from './user';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    modal: modalReducer,
    meeting: meetingReducer,
    drawer: drawerReducer,
    user: userReducer,
  });

export default rootReducer;
