import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


import { SearchBox } from 'components/common/SearchBox';
import { ErrorSection, SearchActionBar, QueryInfiniteLoad } from 'components/common'
import CollectionIndexItem from './CollectionIndexItem';
import { queryCollections } from 'actions';
import { selectCollection, selectCollectionsResult } from 'selectors';



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
      <div>

        Dfdfa 
        <ul className="index">
          {result.results.map(
            res => <CollectionIndexItem key={res.id} collection={res} />
          )}
          
        </ul>
      </div>
    )
  }

  render () {
    const { placeholder, query, result, showQueryTags } = this.props;
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
          {this.renderErrors()}
          {this.renderResults()}
          <QueryInfiniteLoad 
            query={query}
            result={result}
            fetch={this.props.queryCollections}
          />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { query } = ownProps;
  return {
    result: selectCollectionsResult(state, query)
  };
};

export default compose(
  withRouter, 
  connect(mapStateToProps, { queryCollections })
)(CollectionIndex)