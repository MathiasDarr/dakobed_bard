import React from 'react';
import { Button } from '@blueprintjs/core';
import c from 'classnames';

// import { Summary } from 'components/common';
// import CollectionInfo from 'components/Collections/CollectionInfo';
import CollectionStatus from 'components/Collections/CollectionStatus';
import CollectionHeading from 'components/Collections/CollectionHeading';

import './TripReportHeading.scss';

class TripReportHeading extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showMetadata: false };
  }

  toggleMetadata = () => {
    this.setState(({ showMetadata }) => ({ showMetadata: !showMetadata }));
  }

  render() {
    const { collection, activeMode } = this.props;
    const { showMetadata } = this.state;

    return (
      <div className={c('TripReportHeading', {'metadata-shown': showMetadata })}>
        <div className="TripReportHeading__inner-container">
          <CollectionHeading collection={collection} link={!!activeMode} />
          {!!activeMode && (
            <div className="TripReportHeading__metadata">
              {/* {collection.summary && (
                <Summary text={collection.summary} />
              )} */}
              <CollectionStatus collection={collection} showCancel={collection.writeable} />
              <div className="TripReportHeading__divider" />
              {/* <div className="TripReportHeading__metadata__inner-container">
                <CollectionInfo collection={collection} />
              </div> */}
            </div>
          )}
        </div>
        {!!activeMode && (
          <Button
            onClick={this.toggleMetadata}
            minimal
            small
            fill
            className="TripReportHeading__metadata-toggle"
            rightIcon={showMetadata ? 'chevron-up' : 'chevron-down'}
          />
        )}
      </div>
    );
  }
}

export default TripReportHeading;



// import React from 'react';
// import { Button } from '@blueprintjs/core';
// import c from 'classnames';

// import CollectionHeading from 'components/Collections/CollectionHeading';

// import './TripReportHeading.scss';

// class TripReportHeading extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = { showMetadata: false}
//   }

//   toggleMetadata = () => {
//     this.setState(({ showMetadata }) => ({ showMetadata: !showMetadata }));
//   }

//   render(){
//     const { collection, activeMode } = this.props;
//     const { showMetadata } = this.state;

//     return(
//       <div className={c('TripReportHeading', {'metadata-shown': showMetadata })}>
//         <div className="TripReportHeading__inner-container">
//           <CollectionHeading collection={collection} link={!!activeMode} />
//         </div>
//         {!!activeMode && (
//           <Button
//             onClick={this.toggleMetadata}
//             minimal
//             small
//             fill
//             className="TripReportHeading__metadata-toggle"
//             rightIcon={showMetadata ? 'chevron-up': 'chevron-down'}
//           />
//         )}
//       </div>
//     )
//   }

// }

// export default TripReportHeading;