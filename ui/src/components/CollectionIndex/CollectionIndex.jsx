import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { SearchBox } from 'components/common/SearchBox';
import { SearchActionBar } from 'components/common'



import './CollectionIndex.scss';

export class CollectionIndex extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(queryText){
    const { query, result } = this.props;

  }

  render () {

    return (<div className="CollectionIndex">
        <div className="CollectionIndex__controls">
          <SearchBox
            onSearch={this.onSearch}
            inputProps={{large:true, autoFocus: true}}
          />
          <SearchActionBar 
            result={"dfadfa"}
          />
          
        </div>
      </div>
    )

  }

}

export default CollectionIndex