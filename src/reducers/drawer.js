/* eslint-disable no-case-declarations */
import React from 'react';
import { fromJS } from 'immutable';
import { HIDE_DRAWER, SHOW_DRAWER } from '../constants/drawer';

export const initialState = fromJS({
  title: null,
  component: <div />,
  data: {},
  visible: false,
});

function drawerReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_DRAWER:
      return fromJS({ ...action.payload, visible: true });
    case HIDE_DRAWER:
      return initialState;
    default:
      return state;
  }
}

export default drawerReducer;
