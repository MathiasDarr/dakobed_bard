import React, { PureComponent } from 'react';

import './CollectionInfo.scss';

class CollectionInfo extends PureComponent {
  render(){
    const { collection } = this.props;
    if (!collection) {
      return null;
    }

    return(
      <div className="CollectionInfo">
        Collection Info
      </div>
    )
  }
}