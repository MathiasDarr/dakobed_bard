import Query from 'app/Query';

export function entitiesQuery(location) {
  const context = {
    highlight: true,
    'filter:schemata': 'Thing',
  }
  return Query.fromLocation('entities', location, context, '')
}