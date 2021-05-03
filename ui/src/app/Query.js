import _ from 'lodash';
import queryString from 'query-string';

class Query {
  constructor(path, state, context = {}, queryName = ''){
    this.path = path
    this.state = state;
    this.context = context;
    this.queryName = queryName;
  }

  static LIMIT = 30;
  static LARGE = 300;
  static MAX_LIMIT = 9999;

  static fromLocation(path, location, context, queryName) {
    const state = queryString.parse(location.search);
    return new Query(path, state, context, queryName);
  }

}

export default Query;