import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router';

import { Alignment, ButtonGroup, Button } from '@blueprintjs/core';
import queryString from 'query-string';

import collectionViewIds from 'components/Collections/collectionViewIds';
import CollectionView from 'components/Collections/CollectionView';


import TripReportHeading from 'components/TripReports/TripReportHeading';


import './TripReportSidebar.scss';

class TripReportSidebar extends React.Component {
  constructor(props){
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  navigate(mode, type){
    const { history, location } = this.props;
    const parsedHash = queryString.parse(location.hash)
    history.push({
      pathname: location.pathname,
      hash: queryString.stringify(parsedHash)
    })
  }


  renderButton = (id) => {
    const { activeMode, collection } = this.props;

    return (
      <Button
        key={id}
        icon={<CollectionView.Icon id={id}/>}
        text={<CollectionView.Label id={id}/>}
        onClick={() => this.navigate(id)}
        rightIcon={() => this.navigate(id)}
        active={activeMode === id}
        alignText={Alignment.LEFT}
        fill
      />
    )
  }

  render(){
    const { collection, activeMode, activeType } = this.props;
    
    const docTools = [collectionViewIds.DOCUMENTS, collectionViewIds.OVERVIEW ]

    return(
      <div className="TripReportSidebar">
        <TripReportHeading collection={collection} activeMode={activeMode} />
      
        <div className="TripReportSidebar__content">
          <div claassName="TripReportSidebar__section">

          </div>
          <div className="TripReportSidebar__section">
            <h6 className="bp3-heading TriReportSidebar__section__title">
              {"Documents"}
            </h6>
            <ButtonGroup vertical minimal fill className="TripReportSidebar__section__menu">
              {docTools.map(this.renderButton)}
            </ButtonGroup>
          </div>
        </div>
      
      </div>
    )
  }

}


const mapStateToProps = (state, ownProps) => {
  const { collection } = ownProps;
  return {
    schemaCounts: collection?.statistics?.schema?.values || {}
  };
};


export default compose(
  withRouter,
  connect(mapStateToProps),
)(TripReportSidebar)


