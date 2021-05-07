import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { selectCollection } from 'selectors';
import viewIds from './ViewIds';
import CollectionContextLoader from './CollectionContextLoader';

const messages = {
  collection: 'Search this dataset',
  
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
      children, collection, collectionId
    } = this.props;
    
    console.log("THE COLLECITON LOOKS LIKE ", collectionId);


    return (
      <div>
        I AM IN COLLECTION WRAPPER {collectionId}
        <p>

        </p>
        {children}
      </div>
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