import _ from 'lodash';
import { VISIBILITY_FILTERS } from "./constants";

import { loadState } from 'reducers/util';


export const getTodosState = store => store.todos;

export const getTodoList = store =>
  getTodosState(store) ? getTodosState(store).allIds : [];

export const getTodoById = (store, id) =>
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTodos = store =>
  getTodoList(store).map(id => getTodoById(store, id));

export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
  const allTodos = getTodos(store);
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter(todo => todo.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter(todo => !todo.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos;
  }
};


function selectTimestamp(state){
  return state.mutation;
}


function selectObject(state, objects, id){
  if (!id || !_.has(objects, id)){
    return loadState();
  }
  const obj = objects[id];
  const isLoadable = !obj.isError && !obj.isPending;
  if(isLoadable){
    const outdated = obj.loadedAt && obj.loadedAt < selectTimestamp(state);
    obj.shouldLoad = obj.shouldLoad || outdated;
  }
  obj.shouldLoadDeep = obj.shouldLoad || (isLoadable && obj.shalow !== false);
  return obj;
}


export function selectMetadata(state){
  const metadata = selectObject(state, state, 'metadata');
  if (!metadata.isPending){
    metadata.shouldLoad = metadata.shouldLoad || metadata.isError;
  }
  return metadata;
}


export function selectStatistics(state){
  return selectObject(state, state, 'statistics')
}


