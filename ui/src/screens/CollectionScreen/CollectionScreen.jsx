import React, { Component } from 'react';
import queryString from 'query-string';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import Screen from 'components/Screen/Screen'
import Collection from 'components/Collections/Collection';
import CollectionWrapper from 'components/Collections/CollectionWrapper';
import SinglePane from 'components/common/SinglePane';
import CollectionHeading from 'components/Collections/CollectionHeading';
import CollectionViews from 'components/Collections/CollectionViews';

import { selectCollection } from 'selectors';

class CollectionScreen extends Component{

  render(){
    const collectionId = "1";
    const activeMode = true;

    return(
      <Screen
        title={"Collection Label"}
      >
        dfa 
        <CollectionWrapper collectionId={collectionId}>

          <SinglePane>
            <CollectionHeading />
            <CollectionViews
              collectionId={collectionId}
            />

            Single Pane  
          </SinglePane>
        </CollectionWrapper>

      </Screen>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const { collectionId } = ownProps.match.params;
  const activeMode = true;
  const { location } = ownProps;
  console.log("THE location LOOKS LIKE ", location );
  const hashQuery = queryString.parse(location.hash);
  console.log("THE HASH QUERY LOOKS LIKE ", hashQuery );
  return {
    collectionId,
    collection: selectCollection(state, collectionId),
    activeMode
  }
}


export default compose(
  withRouter,
  connect(mapStateToProps)
)(CollectionScreen);