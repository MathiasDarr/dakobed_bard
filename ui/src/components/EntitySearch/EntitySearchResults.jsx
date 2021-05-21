import React, { Component } from 'react';
import c from 'classnames';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { ErrorSection } from 'components/common';
import EntitySearchResultsRow from './EntitySearchResultsRow';

import SortableTH from '../common/SortableTH';



const messages = {
  column_caption: 'Name',
  column_collection_id: 'Collection',
  column_locations: 'Locations',
  column_dates: "Date"
}

class EntitySearchResults extends Component {
  componentDidMount() {
    
  }

  sortColumn(newField) {
    const { query, updateQuery } = this.props;
    const { field: currentField, direction } = query.getSort();

    if (currentField !== newField){
      return updateQuery(query.sortBy(newField, 'asc'));
    }

    // Toggle through sorting states: ascending, descending,m or unseorte
    updateQuery(query.sortBy(
      currentField,
      direction === 'asc' ? 'desc': undefined
    ));

  }

  render(){


    const { entitiesResult, result, history, location, query } = this.props;
    const { hideCollection = false, documentMode = false, showPreview = true } = this.props;
    
    const sortedField = 'nation'
    const direction = 'asc'
    // if (result.isError) {
    //   return <ErrorSection error={result.error} />;
    // } 

    const TH = ({
      sortable, field, className, ...otherProps
    }) => {
      return (
        <SortableTH
          onClick={() => this.sortColumn(field)}
          className={className}
          sorted={sortedField === field && (direction === 'desc' ? 'desc': 'asc' )}
          {...otherProps}
        >
          {messages[`column_${field}`]}
        </SortableTH>
      )
    }

    return(
      <table className="EntitySearchResults data-table">
        <thead>
          <tr>

          </tr>
        </thead>
      </table>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  const entitiesResult = {};
  const entitiesQuery = {};
  
  return {
    entitiesQuery,
    entitiesResult
  } 
}

export default compose(
  withRouter,
  connect(mapStateToProps, {})
)(EntitySearchResults);