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







