import React, { Component } from 'react';
import { Divider } from '@blueprintjs/core';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

//import EntityActionBar from 'components/Entity/EntityActionBar';


import './EntityTable.scss';


const messages = {
  search_placeholder: 'Search {schema}',
  empty: 'No matching {schema} results found',
  add_to_success: 'Successfully added {count} {count, plural, one {entity} other {entities}} to {entitySet}',
  add_link: 'Create link',
  add_to: 'Add to...'
}



export class EntityTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: []
    };
    this.getEntity = this.getEntity.bind(this);
  }

  componentDidMount(){
    this.fetchIfNeeded()
  }

  componentDidUpdate(){

  }

  fetchIfNeeded(){

  }

  onSearchSubmit(queryText) {
    const { query } = this.props;
    const newQuery = query.set('q', queryText);
    this.updateQuery(newQuery);    
  }

  clearSelection() {
    this.setState({ selection: [] });
  }

  getEntity(entityId) {
    return this.props.result.results.find(({ id }) => entityId === id);
  }

  render(){
    const { collection, entityManager, query, result, schema, isEntitySet, sort, updateStatus, writeable } = this.props;
    const { selection } = this.state;
    return(
      <div className="EntityTable">
        
      </div>
    )
  }
}