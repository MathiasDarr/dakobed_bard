import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Screen from 'components/Screen/Screen';
import LoadingScreen from 'components/Screen/LoadingScreen';
import CollectionWrapper from 'components/Collections/CollectionWrapper';
import collectionViewIds from 'components/Collections/collectionViewIds';
import CollectionView from 'components/Collections/CollectionView';
import { BreadCrumbs } from 'components/common';



export class DiagramScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterText: '',
      updateStatus: null,
      downloadTriggered: false
    }
  }
  render(){
    return(
      <Screen
        title={"Diagram label"}
        description={"Diagram Summary"}
      >
        <CollectionWrapper 

        >
        </CollectionWrapper>
      </Screen>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  return {

  }
}

export default compose(
  withRouter, 
  connect(mapStateToProps)
)(DiagramScreen);