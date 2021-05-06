import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import CollectionIndex from 'components/CollectionIndex/CollectionIndex';
import CollectionWrapper from 'components/Collections/CollectionWrapper'
import Screen from 'components/Screen/Screen'
import './CollectionIndexScreen.scss'
import { DualPane} from 'components/common'


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
        <DualPane>
          <DualPane.SidePane>
            <>
              Hellodfadfdaf
            </>
          </DualPane.SidePane>
          <DualPane.ContentPane>
            <h1>Hello dfdaf</h1>
            <CollectionIndex
              icon="database"
            />
          </DualPane.ContentPane>
        </DualPane>


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