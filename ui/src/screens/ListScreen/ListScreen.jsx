import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import Screen from  'components/Screen/Screen';
import ErrorScreen from 'components/Screen/ErrorScreen';
import CollectionWrapper from 'components/Collections/CollectionWrapper';

import { Breadcrumbs, DualPane } from 'components/common';


import './ListScreen.scss';

export class ListScreen extends Component {
  constructor(props){
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
    this.fetchIfNeeded();
  }

  fetchIfNeeded(){
    const { list } = this.props;
  }


  navigate(schema) {
    const { history, location } = this.props;
    const parsedHash = queryString.parse(location.hash);
    history.push({
      pathname: location.pathname,
      search: "",
      hash: queryString.stringify(parsedHash)
    });
  }

  render() {
    const { activeSchema, list } = this.props;
    return(
      <Screen
        title={list.label}
        description={list.summary || ''}
      >
        <CollectionWrapper >
        
        </CollectionWrapper>

      </Screen>
    )
  } 
}

export default ListScreen;