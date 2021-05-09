import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';


import CollectionViewIds from 'components/Collections/collectionViewIds'; 
import { ErrorSection } from 'components/common';
import { collectionSearchQuery } from 'queries';

import './TripReportViews.scss'



const messages = {
  empty: 'There are no mentions yet in this collection'
}

class TripReportViews extends React.Component {
  renderContent(){
    const { collectionId } = this.props;

    const metionsEmpty = (
      <ErrorSection
        icon="tag"
        title={messages.empty}
      />
    )
      
      
    return <div>RENDER CONTENT </div>
  }


  render(){
    let title, subheading;


    return(
      <div className="TripReportViews">
        {!!title && (
          <div className="TripReportViews__title-container">
            <h5 className="TripReportViews__title">
              <span>
                {"THE TITLE GOES HERE"}
              </span>
            </h5>
          </div>
        )}
        <div className="ToolbarView__content">
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { collectionId, location } = ownProps;
  const searchQuery = collectionSearchQuery(location, collectionId);

  return {
    searchQuery,
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps),
)(TripReportViews);