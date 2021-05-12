import _ from 'lodash';
import timestamp from 'util/timestamp';



export function loadState(data){
  const state = data || {};
  return { ...state, isPending: true, shouldLoad: true, shouldLoadDeep: true, isError: false};
}

export function loadComplete(data){
  return{
    ...data,
    isPending: false,
    isError: false,
    shouldLoad: false,
    loadedAt: timestamp(),
    selectorCache: undefined,
    error: undefined
  }
}

export function objectLoadComplete(state, id, data ={}) {
  return {...state, [id]: loadComplete(data) };
}


export function loadStart(state){
  const prevState = state || {}
  return{
    ...prevState,
    isPending: true,
    isError: false,
    shouldLoad: false,
    loadedAt: undefined,
    error: undefined
  }
}


export function loadError(state, error){
  const prevState = state || {};
  return {
    ...prevState,
    isPending: false,
    shouldLoad: false,
    isError: true,
    loadedAt: undefined,
    error
  }
}


export function objectLoadError(state, id, error) {
  return { ...state, [id]: loadError(state[id], error) };
}

export function resultLoadError(state, query, error) {
  return objectLoadError(state, query.toKey(), error);
}

export function objectReload(state, id) {
  const object = { isPending: true, shouldLoad: true };
  return { ...state, [id]: _.assign({}, state[id], object)};
}

export function objectDelete(state, id) {
  _.unset(state, id);
  return state;
}

export function resultObjects(state, result, onComplete = objectLoadComplete) {
  if (result.results !== undefined) {
    return result.results
      .reduce((finalState, object) => onComplete(finalState, object.id, object), state);
  }
  return state;
}




