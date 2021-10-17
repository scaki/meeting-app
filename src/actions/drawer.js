import { HIDE_DRAWER, SHOW_DRAWER } from '../constants/drawer';

export function showDrawer({ title, component, data }) {
  return {
    type: SHOW_DRAWER,
    payload: { title, component, data },
  };
}

export function hideDrawer() {
  return {
    type: HIDE_DRAWER,
  };
}
