import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { entitiesQuery } from 'queries';
import Screen from 'components/Screen/Screen';
import FacetedEntitySearch from 'components/EntitySearch/FacetedEntitySearch';


import './SearchScreen.scss'

const messages = {
  no_results_title: 'No search results',
  no_results_description: 'Try making your search more general',
  title: 'Search',
  loading: 'Loading...'
}


export class SearchScreen extends React.Component {
  render(){
    const { query, result, queryUsers } = this.props;
    const title = messages.title;

    return (
      <Screen title={title}>
        <div className="SearchScreen">
          daf aa 
        </div>
        <FacetedEntitySearch>
          {/* query={query} */}
        </FacetedEntitySearch>
        
      </Screen>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  const query = entitiesQuery(location)
  return { query };
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(SearchScreen)