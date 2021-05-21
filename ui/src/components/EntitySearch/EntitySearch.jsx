import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';
import Query from 'app/Query';
import { ErrorSection, QueryInfiniteLoad } from 'components/common';

import EntitySearchResults from 'components/EntitySearch/EntitySearchResults';
import c from 'classnames';


import './EntitySearch.scss'


const messages = {
  no_results_title: 'No search results',
  no_results_description: 'Try making your search more general'
}


export class EntitySearch extends  Component {
  constructor(props){
    super(props);
    console.log("THE ENTITY SEAR4CH PROPS LOOK LIKE")
  }
  
  fetchIfNeeded(){
    
  }

  componentDidUpdate(){
    this.fetchIfNeeded();
  }

  componentDidMount() {
    this.fetchIfNeeded();
  }

  render(){
    const {
      history, hideCollection, className, selection, result, collection, updateSelection, query
    } = this.props;
  
    //const isEmpty = !query.hasQuery();
    
    const isEmpty = true;

    return(
      <div className={c('EntitySearch', className)}>
          <section className="PartialError">
            { !isEmpty && (
            <ErrorSection 
            icon="search"
            title={messages.no_results_title}
            description={messages.no_results_description}
            />
            
            )}
          </section>
          
        {/* {result.total === 0 && (
          <section className="PartialError">
            { !isEmpty && (
            <ErrorSection 
            icon="search"
            title={messages.no_results_title}
            description={messages.no_results_description}
            />
            
            )}
          </section> */}
        <EntitySearchResults
          query={query}
          result={result}
        />
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { location, query, result, className } = ownProps;
  return {
    query,
    result
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, {})
)(EntitySearch)