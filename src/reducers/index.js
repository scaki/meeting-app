import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import modalReducer from './modal';
import meetingReducer from './meeting';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    modal: modalReducer,
    meeting: meetingReducer,
  });

export default rootReducer;
