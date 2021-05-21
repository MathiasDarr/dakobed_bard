import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Tab, Tabs, Icon } from '@blueprintjs/core';

import { selectEntitiesResult } from 'selectors';
import DocumentViewMode from 'components/Document/DocumentViewMode';


import {
   TextLoading
} from 'components/common';


class EntityViews extends React.Component {
  constructor(props){
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
  }
  
  handleTabChange(mode){
    const { history, location, isPreview } = this.props;
    const parsedHash = queryString.parse(location.hash);
    if (isPreview) {
      parsedHash['preview:mode'] = mode;
    } else {
      parsedHash.mode = mode;
    }
    history.push({
      pathname: location.pathname,
      search: location.search,
      hash: queryString.stringify(parsedHash)
    })
  }

  render() {

    return(
      <Tabs
        id="EntityInfoTabs"
      >
        {isPreview && (
          <Tab
            id="info"
            title={(
              <>
                <Icon icon="info" className="left-icon" />
                <span className="tab-padding">
                  {"Info"}
                </span>
              </>
            )}
          />
        )}
        {
          hasViewMode && (
            <Tab
              id="view"
              title={(
                <>
                  <Icon icon="documentation" className="left-icon" />
                </>
              )}
              panel={<div>Hello Panel componetnt in hasViewMOde</div>}
            />
          )
        }
        {hasBrowseMode && (
          <Tab
            id="browse"
            title={(
              "title"
            )}
          />
        )}
        { entity.schema.isDocument() && (!processingError || !processingError.length) && (
          <Tab
            id="tags"
            
          />
        )}
      </Tabs>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { entity, location, activeMode } = ownProps
  return {

  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(EntityViews);

