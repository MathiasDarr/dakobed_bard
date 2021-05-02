import { createAction } from 'redux-act'

import { ADD_COLLECTION, TOGGLE_TODO, SET_FILTER } from "./actionTypes";

let nextTodoId = 0;

export const addCollection = content => ({
  type: ADD_COLLECTION,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });


export { fetchMetadata, fetchStatistics, fetchSystemStatus } from './metadataActions';


export { createAction };
export const forceMutate = createAction("MUTATE");