import React from 'react';
import { Button } from '@blueprintjs/core';
import c from 'classnames';

import CollectionHeading from 'components/Collections/CollectionHeading';

import './TripReportHeading.scss';

class TripReportHeading extends React.Component {
  constructor(props){
    super(props);
    this.state = { showMetadata: false}
  }

  toggleMetadata = () => {
    this.setState(({ showMetadata }) => ({ showMetadata: !showMetadata }));
  }

  render(){
    const { collection, activeMode } = this.props;
    const { showMetadata } = this.state;

    return(
      <div className={c('TripReportHeading', {'metadata-shown': showMetadata })}>
        <div className="TripReportHeading__inner-container">
          <CollectionHeading collection={collection} link={!!activeMode} />
        </div>
        {!!activeMode && (
          <Button
            onClick={this.toggleMetadata}
            minimal
            small
            fill
            className="TripReportHeading__metadata-toggle"
            rightIcon={showMetadata ? 'chevron-up': 'chevron-down'}
          />
        )}
      </div>
    )
  }

}

export default TripReportHeading;