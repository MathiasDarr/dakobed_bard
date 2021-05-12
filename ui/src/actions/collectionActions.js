import { endpoint } from 'app/api';
import asyncActionCreator from './asyncActionCreator';
import { queryEndpoint } from './util';

// export const queryCollections = asyncActionCreator(query => async() => {
//   queryEndpoint(query);

// }, { name: 'QUERY_COLLECTIONS' });

export const queryCollections = asyncActionCreator(({ id, refresh }) => async () => {
  const config = { params: { refresh } };
  const response = await endpoint.get(`collections`, config);
  return { id, data: response.data };
}, { name: 'QUERY_COLLECTIONS'});



export const fetchCollection = asyncActionCreator(({ id, refresh }) => async () => {
  const config = { params: { refresh } };
  console.log("THE ID IS ", id)
  let post_url = "collections/"+id

  if(!!!id){
    return;
  }
  const response = await endpoint.get(post_url, config);
  return { id, data: response.data };
}, { name: 'FETCH_COLLECTION'});

export const createCollection = asyncActionCreator(collection => async () => {
  const config = { params: { sync: true }};
  const response = await endpoint.post('collections', collection, config);
  return { id: response.id, data: response.data };
}, { name: 'CREATE_COLLECTION'});





// export const deleteCollection = asyncActionCreator(collection => {
//   const config = { params: { sync: false }};
//   await endpoint.delete(`collections/${collection.id}`, config);
//   return { id: collection.id }; 
// }, { name: 'DELETE_COLLECTION '});

// export const fetchCollectionPermissions = asyncActionCreator(id => async () => {
//   const response = await endpoint.get(`collections/${id}/permissions`);
// })