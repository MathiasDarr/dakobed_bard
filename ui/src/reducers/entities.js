import { createReducer } from 'redux-act';

 import {
  queryEntities,
  createEntity,
  updateEntity,
  deleteEntity,
  fetchEntityTags,
  fetchEntity
} from 'actions';

import {
  resultObjects
} from 'reducers/util';


const initialState = {};

export default createReducer({
  [queryEntities.COMPLETE]: (state, { result }) => resultObjects(state, result)
}, initialState )