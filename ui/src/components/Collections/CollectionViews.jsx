import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Tabs, Tab } from '@blueprintjs/core';
import queryString from 'query-string';

import CollectionView from './CollectionView';

import { selectCollection } from 'selectors';

import collectionViewIds from 'components/Collections/collectionViewIds';
// import FacetedEntitySearch from 'components/EntitySearch/FacetedEntitySearch';

import Collection from './Collection';


class CollectionViews extends React.Component {
  constructor(props){
    super(props);

  }

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
          panel={"I'm a panel"}
        >
        </Tab>

        <Tab
          id={collectionViewIds.OVERVIEW}
          className="CollectionViews__tab"
          title={(
            <CollectionView.Label id={collectionViewIds.SEARCH} icon />
          )}
          panel={"I AM A SECOND PANEL"}
        >


          </Tab>
        
          <Tab
          id={collectionViewIds.SEARCH}
          className="CollectionViews__tab"
          title={(
            <CollectionView.Label id={collectionViewIds.SEARCH} icon />
          )}
          panel={"Disconnec"}
          >

          </Tab>
        
        <Tab
          id={collectionViewIds.DOCUMENTS}
          className="CollectionViews__tab"
          title={collectionViewIds.SEARCH === activeMode && (
            <CollectionView.Label id={collectionViewIds.SEARCH} icon />
          )}
          // panel={<FacetedEntitySearch query={searchQuery} />}
          panel={"I AM THE DOCUMENTS PANEL"}
        />

        <Tab
          id={collectionViewIds.SEARCH}
          className="CollectionViews__tab"
          title={collectionViewIds.SEARCH === activeMode && (
            <CollectionView.Label id={collectionViewIds.SEARCH} icon />
          )}
          // panel={<FacetedEntitySearch query={searchQuery} />}
          panel={"I AM A SECOND PANEL"}
        />

      </Tabs>
      // <Tabs 
        // id="CollectionInfoTabs"
        // className="@CollectionViews__tabs info-tabs-padding"
        // onChange={this.handleTabChange}
        // selectedTabId={activeMode}
        // renderActiveTabPanelOnly
      // >
      //   <Tab
      //     id={collectionViewIds.SEARCH}
      //     className="CollectionViews__tab"
      //     title={  <CollectionView.Label id={collectionViewIds.OVERVIEW} icon /> }
      //   >
      //     <>
      //       Hdllo dfa
      //     </>

      //   </Tab>
        // <Tab
        //   id={collectionViewIds.OVERVIEW}
        //   className="CollectionViews__tab"
        //   title={"Title1"}
        // >
        //   <>
        //     Hdllo dfa
        //   </>
        // </Tab>
      // </Tabs>
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
//   const { collectionId, location } = ownProps;
//   return {
//     collection: selectCollection(state, collectionId)
//   }
// }

// CollectionViews = connect(mapStateToProps, {})(CollectionViews);
// CollectionViews =- withRouter(CollectionViews);
export default CollectionViews;