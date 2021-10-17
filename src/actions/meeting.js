import {
  ADD_MEETING,
  LOADED_MEETING,
  LOAD_MEETING,
  POST_MEETING,
} from '../constants/meeting';

export function postMeeting(values, success = () => {}, error = () => {}) {
  return {
    type: POST_MEETING,
    values,
    success,
    error,
  };
}

export function addMeeting(values) {
  return {
    type: ADD_MEETING,
    values,
  };
}

export function loadMeeting(success = () => {}, error = () => {}) {
  return {
    type: LOAD_MEETING,
    success,
    error,
  };
}

export function loadedMeeting(values) {
  return {
    type: LOADED_MEETING,
    values,
  };
}
