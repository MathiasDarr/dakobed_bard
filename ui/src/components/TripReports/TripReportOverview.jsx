import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AnchorButton, Intent } from '@blueprintjs/core';
import { selectCollection } from 'selectors';


class TripReportOverview extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="TripReportOverview">
        
        <div className="TripReportOverview__section">
          <h6 className="TripReportOverview__section__title bp3-heading bp3-text-muted">
            Getting Started
          </h6>
        </div>

        <div className="TripReport__section">
          <div className="TripReportOverview__section__content">
            {"COLLECTION"}
          </div>
        </div>


        <div className="TripReportOverview__section">
          <h6 className="TripreportOverview__section__title bp3-heading bp3-text-muted">
            {"Quick links"}
          </h6>
          <div className="TripReportOverview__section__content">

          </div>
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { collectionId, location } = ownProps;
  const context = {
    'facet': 'event',
    'filter:channels': `Collection:${collectionId}` 
  }
  return {
    collection: selectCollection(state, collectionId)
  }; 
}
export default compose(
  withRouter,
  connect(mapStateToProps)
)(TripReportOverview);