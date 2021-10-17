/* eslint-disable no-case-declarations */
import React from 'react';
import { fromJS } from 'immutable';
import { HIDE_MODAL, SHOW_MODAL } from '../constants/modal';

export const initialState = fromJS({
  title: null,
  component: <div />,
  data: {},
  visible: false,
});

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return fromJS({ ...action.payload, visible: true });
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export default modalReducer;
