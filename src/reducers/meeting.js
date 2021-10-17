/* eslint-disable no-case-declarations */
import { fromJS } from 'immutable';
import {
  ADD_MEETING,
  LOADED_MEETINGS,
  PUT_MEETING,
} from '../constants/meeting';

export const initialState = fromJS([]);

function meetingReducer(state = initialState, action) {
  switch (action.type) {
    case LOADED_MEETINGS:
      return fromJS(action.values);
    case ADD_MEETING:
      return fromJS([...state.toJS(), action.values]);
    case PUT_MEETING:
      const oldState = state.toJS();
      const meetingIndex = oldState.findIndex(x => x.id === action.values.id);
      oldState[meetingIndex] = action.values;
      return fromJS(oldState);
    default:
      return state;
  }
}

function selectMeetingsSortByDate(state) {
  const meetings = state.toJS();
  return meetings.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export { selectMeetingsSortByDate };

export default meetingReducer;
