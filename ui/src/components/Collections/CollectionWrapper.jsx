import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { selectCollection } from 'selectors';
import viewIds from './ViewIds';
import CollectionContextLoader from './CollectionContextLoader';

import CollectionManageMenu from './CollectionManageMenu';
import { Breadcrumbs, SearchBox } from 'components/common';


const messages = {
  collection: 'Search this collection',
  
}

export class CollectionWrapper extends Component {
  constructor(props){
    super(props);
    this.onSearch();    
  }

  onSearch(queryText){
    const { collectionId } = this.props;
    console.log("THE COLLECTION ID IS LOOKS LIKE", collectionId)
  }


  render(){
    const {
      children, collection, collectionId, query
    } = this.props;
    
    console.log("THE COLLECITON LOOKS LIKE ", collectionId);

    const operation = <CollectionManageMenu collection={collection} />
    
    const search = (
      <SearchBox
        onSearch={this.onSearch}
        placeholder={"CollectionWrapper Search"}
        query={"QUERY FOR DATA"}
        inputProps={{ disabled: !collection?.id }}
      />
    )

    const breadcrumbs = (
      <Breadcrumbs operation={operation} search={search}>
        <Breadcrumbs.Collection key="collection" collection={collection} />
      </Breadcrumbs>
    )

    return (
      <div>
 
        <CollectionContextLoader collectionId={collectionId}>
          {breadcrumbs}
          {search}
          { children }
        </CollectionContextLoader>

      </div>
      // <CollectionContextLoader collectionId={collectionId}>
      //   {breadcrumbs}
      //   I AM IN COLLECTION WRAPPER {collectionId}
      //   <p>

      //   </p>
      //   {children}
      // </CollectionContextLoader>
    )
  }

}


      
// <CollectionContextLoader collectionId={collectionId}>
// {/* {children} */}
// </CollectionContextLoader>


const mapStateToProps = (state, ownProps) => {
  const { collection, collectionId: id, location} = ownProps;
  const collectionId = id || collection?.id;
  const collectionStatus = selectCollection(state, collectionId)?.status
  return {
    collectionId,
    collection: { ...collection, status: collectionStatus}
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps),
)(CollectionWrapper);