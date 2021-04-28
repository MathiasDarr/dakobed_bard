import { endpoint } from 'app/api'
import asyncActionCreator from 'actions/asyncActionCreator'

export const fetchMetadata = asyncActionCreator(() => async () => {
  const response = await endpoint.get('metadata');
  return { metadata: response.data };
}, { name: 'FETCH_METADATA '});

export const fetchStatistics = asyncActionCreator(() => async () =>{
  const response = await endpoint.get('statistics');
  return {statistics: response.data};
}, {name: 'FETCH_STATISTICS'} )