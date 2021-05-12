import React from 'react';
import queryString from 'query-string';
import { Icon } from '@blueprintjs/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { DualPane, ErrorSection, HotKeysContainer  } from 'components/common';
import EntitySearch from 'components/EntitySearch/EntitySearch';


import SearchActionBar from 'components/common/SearchActionBar';

import './FacetedEntitySearch.scss'

const defaultFacets = [
  'schema','names'
]

const messages = {
  no_results_title: 'No search results',
  no_results_description: 'Try making your search more general'
}


export class FacetedEntitySearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hideFacets: false,
    }
  }

  updateQuery(newQuery) {
    const { history, location } = this.props;
    const parsedHash = queryString.parse(location.hash);
    parsedHash['preview:id'] = undefined
    parsedHash['preview:type'] = undefined
  
    history.push({
      pathname: location.pathname,
      search: newQuery.toLocation(),
      hash: queryString.stringify(parsedHash)
    })
  }




  showNextPreview(event){
    console.log("ahdfadrfaaaaaaaaaaaaaaaaaa jjjj kkk")
    // const currentSelectionIndex = this.get
  }

  toggleFacets(){
    this.setState(({ hideFacets }) => ({ hideFacets: !hideFacets }));
  }


  render() {
    const { additionalFacets = [], children, result, query } = this.props
    const { hideFacets } = this.state;
    const hideFacetsClass = hideFacets ? 'show': 'hide';
    const plusMinusIcon = hideFacets ? 'minues': 'plus';
    
    const facets = [...additionalFacets, ...defaultFacets]
    
    console.log("FACETS",facets)
    console.log('HIDE FACETS',hideFacets)

    const empty = (
      <ErrorSection 
        icon="search"
        title={messages.no_results_title}
        description={messages.no_results_description}
      />
    )



    return(
      <HotKeysContainer
        hotKeys={[
          {
            combo: 'j', global: true, label: 'Preview next search entity', onKeyDown: this.showNextPreview
          },
          {
            combo: 'k', global: true, label: 'Preview previous search entity', onKeyDown: this.showNextPreview
          }
        ]}
      >
        <DualPane>
          <DualPane.SidePane>
            <div
              role="switch"
              aria-checked={!hideFacets}
              tabIndex={0}
              className="visible-sm-flex facets total-count bp3-text-muted"
              onClick={this.toggleFacets}
              onKeyPress={this.toggleFacets}
            >
              <Icon icon={plusMinusIcon} />
              <span className="total-count-span">
                {messages.filters}
              </span>
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


            <EntitySearch 
              query={query}
              updateQuery={this.updateQuery}
              result={result}
              emptyComponent={empty}
            />
          </DualPane.ContentPane>
        </DualPane>
      </HotKeysContainer>

    )
  }
}

export default FacetedEntitySearch;