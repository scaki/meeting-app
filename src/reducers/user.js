import { fromJS } from 'immutable';
import { LOADED_ME } from '../constants/user';

export const initialState = fromJS({
  id: null,
  name: {
    title: '',
    first: '',
    last: '',
  },
  email: null,
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOADED_ME:
      return fromJS(action.values);
    default:
      return state;
  }
}

export default userReducer;
