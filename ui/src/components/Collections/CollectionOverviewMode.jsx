import React, { Component } from 'react';
import { compose } from 'redux';
import { connect }from 'react-redux';
import c from 'classnames';

import TripReportOverview from 'components/TripReports/TripReportOverview';
import { ErrorSection } from 'components/common';
import { selectCollection } from 'selectors';



import './CollectionOverviewMode.scss';



const messages = {
  empty: 'This collection is empty'
}

class CollectionOverviewMode extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const { collection, collectionId } = this.props;
    const isTripReport = true;
    const emptyComponent = (
      <ErrorSection 
        icon="database"
        title={messages.empty}
      />
    )
    
    return(
      <div className={c('CollectionOverviewMode', { tripReport: true})}>
        <div className="CollectionOverviewMode__main">
          {isTripReport && <TripReportOverview collectionId={collectionId} />}

          
        </div>
      </div>
    )
  }
}




// const CollectionOverviewMode = ({ collection, collectionId, isTripReport }) => {
  // const emptyComponent = (
  //   <ErrorSection 
  //     icon="database"
  //     title={messages.empty}
  //   />
  // )
  
  // return(
  //   <div className={c('CollectionOverviewMOde', { tripReport: true})}>
  //     {/* <div className="CollectionOverviewMode__main">
  //       {isTripReport}
  //     </div> */}
  //   </div>
//   );
  
// }

const mapStateToProps = (state, ownProps) => { 
  const { collectionId } = ownProps;
  return {
    collection: selectCollection(state, collectionId)
  };
};


export default compose(
  connect(mapStateToProps)
)(CollectionOverviewMode);