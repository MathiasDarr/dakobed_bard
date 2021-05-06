import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


import './CollectionIndex.scss';

export class CollectionIndex extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(queryText){
    const { query } = this.props;

  }

  render () {

    return (<div className="CollectionIndex">
        <div className="CollectionIndex__controls">
        
        </div>
      </div>
    )

  }

}

export default CollectionIndex