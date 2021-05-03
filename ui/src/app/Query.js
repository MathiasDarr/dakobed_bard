import _ from 'lodash';
import queryString from 'query-string';
import ensureArray from 'util/ensureArray';

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

  set(name, value) {
    return this.set(name, _.toString(value));
  }
  
  setString(name, value) {
    return this.set(name, _.toString(value));
  }
  
  getString(name) {
    return _.toString(_.head(this.getList(name)));
  }

  getList(name){
    const fieldName = this.queryName + _.toString(name);
    const ctxValues = ensureArray(this.context[name]);
    const stateValues = ensureArray(this.state[fieldName]);
    return _.uniq(_.concat(ctxValues, stateValues));
  }

  toString() {
    if(!this.path) { return undefined; }
    const query = queryString.stringify(this.toParams());
    return `${this.path}?${query}`; 

  }





}

export default Query;