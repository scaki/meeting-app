import {
  ADD_MEETING,
  EDIT_MEETING,
  LOADED_MEETINGS,
  LOAD_MEETING,
  LOAD_MEETINGS,
  LOAD_MEETINGS_BY_DATE,
  POST_MEETING,
  PUT_MEETING,
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

export function loadMeetings(success = () => {}, error = () => {}) {
  return {
    type: LOAD_MEETINGS,
    success,
    error,
  };
}

export function loadedMeetings(values) {
  return {
    type: LOADED_MEETINGS,
    values,
  };
}

export function loadMeetingsByDate(date, success = () => {}, error = () => {}) {
  return {
    type: LOAD_MEETINGS_BY_DATE,
    date,
    success,
    error,
  };
}

export function loadMeeting(id, success = () => {}, error = () => {}) {
  return {
    type: LOAD_MEETING,
    id,
    success,
    error,
  };
}

export function editMeeting(values, success = () => {}, error = () => {}) {
  return {
    type: EDIT_MEETING,
    values,
    success,
    error,
  };
}

export function putMeeting(values) {
  return {
    type: PUT_MEETING,
    values,
  };
}
