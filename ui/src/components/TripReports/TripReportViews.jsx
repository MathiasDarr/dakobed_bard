import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';


import CollectionViewIds from 'components/Collections/collectionViewIds'; 
import CollectionView from 'components/Collections/CollectionView';

import CollectionOverviewMode from 'components/Collections/CollectionOverviewMode';

import FacetedEntitySearch from 'components/EntitySearch/FacetedEntitySearch';

import { ErrorSection } from 'components/common';
import { collectionSearchQuery } from 'queries';

import './TripReportViews.scss'



const messages = {
  empty: 'There are no mentions yet in this collection'
}

class TripReportViews extends React.Component {
  constructor(props) {
    super(props)
  }
  renderContent(){
    const { collectionId } = this.props;

    const metionsEmpty = (
      <ErrorSection
        icon="tag"
        title={messages.empty}
      />
    )
    
    const activeMode = 'overview';
    
    const isTripReport = true;

    switch (activeMode) {
      case 'search':
        return <FacetedEntitySearch collectionId={collectionId} />
      default:
        return <CollectionOverviewMode collectionId={collectionId} isTripReport />
    }
      
  }


  render(){
    const { activeMode, activeType } = this.props;
    
    
    let title, subheading;

    console.log("TYHE ACTIVE MODE IS ", activeMode)
    
    
    if (activeMode === CollectionViewIds.SEARCH) {
      title = null;
    } else if (!!activeType) {
      
    }

      // } else {
    //   title = <CollectionView.Label id ={activeMode} icon />
    //   subheading = "This is the subheading"
    // }
  
    return(
      <div className="TripReportViews">
        {!!title && (
          <div className="TripReportViews__title-container">
            <h5 className="TripReportViews__title">
              <span>
                {title}\
                {title}
              </span>
            </h5>
            {subheading && <p className="TripReportViews__subheading">{subheading}</p>}
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