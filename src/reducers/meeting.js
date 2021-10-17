/* eslint-disable no-case-declarations */
import { fromJS } from 'immutable';
import { ADD_MEETING, LOADED_MEETING } from '../constants/meeting';

export const initialState = fromJS([]);

function meetingReducer(state = initialState, action) {
  switch (action.type) {
    case LOADED_MEETING:
      return fromJS(action.values);
    case ADD_MEETING:
      return fromJS([...state.toJS(), action.values]);
    default:
      return state;
  }
}

export default meetingReducer;
