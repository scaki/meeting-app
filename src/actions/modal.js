import { HIDE_MODAL, SHOW_MODAL } from '../constants/modal';

export function showModal({ title, component, data }) {
  return {
    type: SHOW_MODAL,
    payload: { title, component, data },
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
  };
}
