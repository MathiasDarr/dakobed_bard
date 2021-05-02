import { endpoint } from 'app/api';

export async function queryEndpoint({ query, result, next }) {
  if( next ) {
    const response = await endpoint.get(next);
    return { query, result: response.data };
  }
  const response = await endpoint.get(query.path, {
    params: query.toParams(),
  });
  return { query, result: response.data };
}