import { LOADED_ME, LOAD_ME } from '../constants/user';

export function loadMe() {
  return {
    type: LOAD_ME,
  };
}

export function loadedMe(values) {
  return {
    type: LOADED_ME,
    values,
  };
}
