import { endpoint } from 'app/api';
import asyncActionCreator from './asyncActionCreator';
import { queryEndpoint } from './util';

export const queryEntities = asyncActionCreator(query => async () => queryEndpoint(query), { name: 'QUERY_ENTITIES' });