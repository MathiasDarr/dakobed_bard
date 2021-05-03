import { endpoint } from 'app/api';
import asyncActionCreator from './asyncActionCreator';
import { queryEndpoint } from './util';

export const queryCollections = asyncActionCreator(query => async() => queryEndpoint(query), { name: 'QUERY_COLLECTIONS' });

export const fetchCollection = asyncActionCreator(({ id, refresh }) => async () => {
  const config = { params: { refresh } };
  const response = await endpoint.get(`collections/${id}`, config);
  return { id, data: response.data };
}, { name: 'FETCH_COLLECTION'});

export const createCollection = asyncActionCreator(({id, refresh }) => async () => {
  const config = { params: { refresh }};
  const response = await endpoint.get(`collections/${id}`, config);
  return { id, data: response.data };
}, { name: 'FETCH_COLLECTION'});

// export const deleteCollection = asyncActionCreator(collection => {
//   const config = { params: { sync: false }};
//   await endpoint.delete(`collections/${collection.id}`, config);
//   return { id: collection.id }; 
// }, { name: 'DELETE_COLLECTION '});

// export const fetchCollectionPermissions = asyncActionCreator(id => async () => {
//   const response = await endpoint.get(`collections/${id}/permissions`);
// })