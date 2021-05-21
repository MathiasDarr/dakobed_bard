import _ from 'lodash';
import { VISIBILITY_FILTERS } from "./constants";
import { Model } from '@dakobeddata/dakobed_schemas/model';
import { loadState } from 'reducers/util';
import EntitySearchResultsRow from 'components/EntitySearch/EntitySearchResultsRow';


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

function selectResult(state, query, expand) {
  console.log("SELECT RESULT FROM THE SELECTOR", state)
  if (!query || !query.path){
    return {
      ...loadState(),
      results: [],
      shouldLoad: false,
      shouldLoadDeep: false,
      isPending: true
    };
  }
  const result = {
    results: [],
    ...selectObject(state, state.results, query.toKey())
  }

  if (expand) {
    result.results = result.results
      .map(id => expand(state, id))
      .filter((r) => r.id !== undefined)
    }
  return result;
}





export function selectMetadata(state){
  const metadata = selectObject(state, state, 'metadata');
  if (!metadata.isPending){
    metadata.shouldLoad = metadata.shouldLoad || metadata.isError;
  }
  return metadata;
}

export function selectPages(state){
  return selectMetadata(state).pages
}

export function selectPage(state, name) {
  return selectPages(state).find((page) => page.name === name);
}


export function selectModel(state) {
 const metadata = selectMetadata(state);
  if (metadata.model && !metadata.dakobed_schema_model) {
    metadata.dakobed_schema_model = new Model(metadata.model)
  }
  return metadata.dakobed_schema_model
}


// export function selectModel(state) {
//   const metadata = selectMetadata(state);
// }



export function selectStatistics(state){
  return selectObject(state, state, 'statistics')
}

export function selectRole(state, roleId) {
  return selectObject(state, state.roles, roleId);
}


export function selectSession(state) {
  return selectObject(state, state, 'session');
}

export function selectCurrentRoleId(state) {
  const session = selectSession(state);
  if (!!session.token) {
    return session.token.split('.', 1);
  }
}

export function selectAdmin(state){
  const role = selectCurrentRole(state);
  return role.is_admin || false;
}



export function selectCollection(state, collectionId) {
  const collection = selectObject(state, state.collections, collectionId);
  // status.pending = status.pending || 0;
  // status.running = status.running || 0;
  // status.total = status.active + status.finished;
  // collection.status = status;
  return collection;
}

export function selectCurrentRole(state) {
  const roleId = selectCurrentRoleId(state);
  return !!roleId ? selectRole(state, roleId) : {};
}

export function selectDocumentContent(state, documentId) {
  return selectObject(state, state.documentContent, documentId);
}

export function selectCollectionsResult(state, query) {
  return selectResult(state, query, selectCollection);
}

export function selectEntitiesResult(state, query) {
  return selectResult(state, query, selectEntity)
}


export function selectEntity(state, entityId) {
  const entity = selectObject(state, state.entities, entityId);
  if (!entity.selectorCache) {
    const model = selectModel(state);
    if (!entity.schema || !model) {
      return entity;
    }
    entity.selectorCache = model.getEntity(entity)
  }

  const result = entity.selectorCache;
  result.isPending = !!entity.isPending
  return result;
}

export function selectEntitySet(state, entitySetId) {
  return selectObject(state, state.entitySets, entitySetId);
}

export function selectEntitySetItem(state, itemId) {
  const item = selectObject(state, state.entitySetITems, itemId);
  item.entity = selectEntity(state, item.entityId || item.entity?.id);
  return item;
}

export function selectEntityView(state, entityId, mode, isPreview) {
  if(mode) {
    return mode;
  }

  const { schema } = selectEntity(state, entityId);
  if (schema && schema.isAny(['Image', 'Table'])){
    return 'view';
  }
  if(schema && schema.isA('Folder')) {
    return 'browse';
  }
  if (schema && schema.isDocument()) {
    return 'view';
  }
  if (isPreview) {
    return 'info';
  }
  return 'similar';
}


export function selectEntityMapping(state, entityId) {
  return selectObject(state, state.entityMappings, entityId);
}

