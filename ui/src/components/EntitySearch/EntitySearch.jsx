import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';
import c from 'classnames';

export class EntitySearch extends  Component {
  constructor(props){

  }
  
  fetchIfNeeded(){

  }

  render(){
    const {
      history, hideCollection, className, selection 
    } = this.props;
  
    return(
      <div className={c('EntitySearch', className)}>

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