import React, { Component } from 'react';
import queryString from 'query-string'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router'; 

import Screen from 'components/Screen/Screen'
import { DualPane} from 'components/common'
import CollectionIndex from 'components/CollectionIndex/CollectionIndex';
import TripReportSidebar from 'components/TripReports/TripReportSidebar';
import TripReportViews from 'components/TripReports/TripReportViews';
import ErrorScreen from 'components/Screen/ErrorScreen';
import { selectCollection } from 'selectors';
import { CollectionWrapper } from 'components/Collections/CollectionWrapper';



const messages = {
  side_pane_message: "Trip reports Side Pane",
  content_pane_message: "Trip reports Content Pane"
}

export class TripReportScreen extends Component {

  constructor(props){
    super(props)
  }

  render(){
    const { collection, collectionId, activeMode, activeType } = this.props;
    return(
    <Screen
        title ={"TripReportScreen"}
        description={"Trip reports"}
    >
      <CollectionWrapper collectionId = {collectionId} collection={collection} >
        <DualPane>
          <DualPane.SidePane>
            <>
              
              <h2>
              { messages.side_pane_message }
              </h2>
              sdfa
            </>
          </DualPane.SidePane>
          <DualPane.ContentPane>
            <div className="TripReportScreen__body-content">
              <TripReportViews 
                collectionId={collectionId}
                activeMode={activeMode}
                activeType={activeType}
              />
            </div>
          </DualPane.ContentPane>
        </DualPane>

      </CollectionWrapper>
    </Screen>
    )
  }
  

}

const mapStateToProps = (state, ownProps) => {
  const { collectionId } = ownProps.match.params;
  console.log("THE COLLECTION ID IS BEING SET TO FROM THE TRIP REPORT SCREEN ", collectionId)
  const { location } = ownProps;
  const hashQuery = queryString.parse(location.hash);
  const activeMode = hashQuery.mode;
  const activeType = hashQuery.type;
  return {
    collectionId,
    collection: selectCollection(state, collectionId),
    activeMode,
    activeType
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(TripReportScreen);
 
