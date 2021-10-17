import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import modalReducer from './modal';
import meetingReducer from './meeting';
import drawerReducer from './drawer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    modal: modalReducer,
    meeting: meetingReducer,
    drawer: drawerReducer,
  });

export default rootReducer;
