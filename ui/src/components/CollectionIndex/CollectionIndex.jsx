import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { SearchBox } from 'components/common/SearchBox';
import { ErrorSection, SearchActionBar } from 'components/common'

import CollectionIndexItem from './CollectionIndexItem';

import './CollectionIndex.scss';

export class CollectionIndex extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(queryText){
    const { query, result } = this.props;

  }

  renderErrors(){
    const { emptyText, icon, result } = this.props;
    
    if (result.isError) {
      return <ErrorSection error={result.error} />;
    }

    if (result.total === 0) {
      const message = emptyText;
      return <ErrorSection icon={icon} title={message} />
    }
    
    return null;
  }

  renderResults(){
    const { result } = this.props;
    const skeletonItems = [...Array(10).keys()];
    return (
      <ul className="index">
        {result.results.map(
          res => <CollectionIndexItem key={res.id} collection={res} />
        )}
        
      </ul>
    )
  }

  render () {

    return (
      <div className="CollectionIndex">
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