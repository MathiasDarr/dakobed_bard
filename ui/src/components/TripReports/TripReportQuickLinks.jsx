import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import collectionViewIds from 'components/Collection/collectionViewIds';

class TripReportQuickLinks extends React.Component {
  render(){
    return(
      <div>
        Quick Links
      </div>
    )
  }
}

export default compose(
  withRouter
)(TripReportQuickLinks);