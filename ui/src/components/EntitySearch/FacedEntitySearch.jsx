import React from 'react';
import queryString from 'query-string';
import { Icon } from '@blueprintjs/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { DualPane } from 'components/common';
import SearchActionBar from 'components/common/SearchActionBar';

import './FacetedEntitySearch.scss'

export class FacetedEntitySearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hideFacets: false,
    }
  }

  render() {
    const { children, result } = this.props
    const { hideFacets } = this.state;
    const hideFacetsClass = hideFacets ? 'show': 'hide';
    const plusMinusIcon = hideFacets ? 'minues': 'plus';
    return(
      <DualPane>
        <DualPane.SidePane>
          <div>
            <Icon icon={plusMinusIcon} />
          </div>
          <span className="total-count-span">
            Filters
          </span>
          {children}
          
        </DualPane.SidePane>
        <DualPane.ContentPane>
          {children}
          {/* <div className={`FacetedEntitySearch__controls${queryUsers ? "__tracking": ""}`}>

          </div> */}

          <SearchActionBar result={result}>

          </SearchActionBar>
        </DualPane.ContentPane>
      </DualPane>
    )
  }
}

export default FacetedEntitySearch;