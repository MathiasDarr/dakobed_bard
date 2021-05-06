import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import CollectionIndex from 'components/CollectionIndex/CollectionIndex';
import CollectionWrapper from 'components/Collections/CollectionWrapper'
import Screen from 'components/Screen/Screen'
import './CollectionIndexScreen.scss'
class CollectionIndexScreen extends React.Component {

  constructor(props){
    super(props)
  }
  
  render(){

    const { collectionId, collection } = this.props;

    return(
      <Screen
        title ={"Collection Label"}
        description={"Summary"}
      >
        <CollectionWrapper >
        </CollectionWrapper>
          
      </Screen>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
  const { collectionId } = ownProps.match.params;
  const { location } = ownProps;
} 




export default compose(
  withRouter,
  connect(mapStateToProps),
)(CollectionIndexScreen);