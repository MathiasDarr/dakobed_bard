import React from 'react';
import { Tabs, Tab } from '@blueprintjs/core';


import viewIds from 'components/Collections/ViewIds'


class CollectionViews extends React.Component {


  render() {
    return(
      <Tabs 
        id="CollectionInfoTabs"
        className="@CollectionViews__tabs info-tabs-padding"
      >
        <Tab
          id={viewIds.SEARCH}
          className="CollectionViews__tab"
          title={"Title1"}
        >

          <>
            Hdllo dfa
          </>

        </Tab>
        <Tab
          id={viewIds.OVERVIEW}
          className="CollectionViews__tab"
          title={"Title1"}
        >
          <>
            Hdllo dfa
          </>
        </Tab>
      </Tabs>
    )
  }
}

export default CollectionViews;