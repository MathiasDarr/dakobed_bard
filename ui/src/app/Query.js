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

  clone() {
    const state = _.cloneDeep(this.state);
    return new Query(this.path, state, this.context, this.queryName);
  }

  setPlain(name, value){
    this.state[this.pqueryName + name] = ensureArray(value);
  }


  add(name, value) {
    const values = this.getList(name);
    return this.set(name, _.union(values, [value]));
  }


  clear(name){
    return this.set(name, []);
  }


  
  fields() {
    const keys = _.keys(this.context);
    _.keys(this.state).forEach((name) => {
      if(name.startsWith(this.queryName)) {
        keys.push(name.substr(this.queryName.length));
      }
    });
    return _.uniq(keys);
  }
  
  
  
  
  set(name, value) {
    const child = this.clone();
    return this.setPlain.call(child, name, value);  
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

  toKey(){
    // Strip the parts of the query that are irrelevanmnt to the result 
    return this.toString();
  }

  toParams() {
    const params = {};
    this.fields().forEach((name)=> {
      params[name] = this.getList(name);
    });
    return params;
  }




}

export default Query;