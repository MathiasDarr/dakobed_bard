import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Tabs, Tab } from '@blueprintjs/core';
import queryString from 'query-string';

import CollectionDocumentsMode from 'components/Collections/CollectionDocumentsMode';
import CollectionView from './CollectionView';

import collectionViewIds from 'components/Collections/collectionViewIds';
// import FacetedEntitySearch from 'components/EntitySearch/FacetedEntitySearch';

import { selectCollection, selectEntitiesResult } from 'selectors';


import FacetedEntitySearch from 'components/EntitySearch/FacetedEntitySearch'
import { collectionSearchQuery } from 'queries';


import './CollectionViews.scss';



class CollectionViews extends React.Component {
  constructor(props){
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
  };

  // componentDidUpdate() {
  //   const { activeMode } = this.props;
  //   if (Object.values(collectionViewIds).indexOf(activeMode) < 0) {
  //     this.handleTabChange(collectionViewIds.OVERVIEW);
  //   }
  // }

  handleTabChange(mode) {
    const { history, location } = this.props;
    const parsedHash = queryString.parse(location.hash);

    parsedHash.mode = mode;
    delete parsedHash.type;

    history.push({
      pathname: location.pathname,
      hash: queryString.stringify(parsedHash)
    })
  }


  render() {

    const {
      collection, collectionId, activeMode, searchQuery
    } = this.props;
    return(

      <Tabs 
        id="CollectionInfoTabs"
        className="@CollectionViews__tabs info-tabs-padding"
        onChange={this.handleTabChange}
        selectedTabId={activeMode}
        renderActiveTabPanelOnly
      >
        <Tab
          id={collectionViewIds.OVERVIEW}
          className="CollectionViews__tab"
          title={(
            <CollectionView.Label id={collectionViewIds.OVERVIEW} icon />
          )}
          panel={"I'm the overview panel"}
        >
        </Tab>

        <Tab
          id={collectionViewIds.DOCUMENTS}
          className="CollectionViews__tab"
          title={(
            <CollectionView.Label id={collectionViewIds.DOCUMENTS} icon />
          )}
          panel={<CollectionDocumentsMode collectionId={collectionId} />}
        >
        </Tab>
        <Tab
          id={collectionViewIds.SEARCH}
          className="CollectionViews__tab"
          title={collectionViewIds.SEARCH === activeMode && (
            <CollectionView.Label id={collectionViewIds.SEARCH} icon />
          )}
        />
      </Tabs>

    )
  }
}



const mapStateToProps = (state, ownProps) => {
  const { collectionId, location } = ownProps;
  const searchQuery = collectionSearchQuery(location, collectionId);

  return {
    collection: selectCollection(state, collectionId),
    searchQuery,
    searchResult: selectEntitiesResult(state, searchQuery)
  }
}


CollectionViews = connect(mapStateToProps, {})(CollectionViews)
CollectionViews = withRouter(CollectionViews);
export default CollectionViews;

// export default CollectionViews;




