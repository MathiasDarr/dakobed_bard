import React, { Component } from 'react';
import c from 'classnames';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { ErrorSection } from 'components/common';
import EntitySearchResultsRow from './EntitySearchResultsRow';

import c from 'classnames';
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


    const { result, history, location, query } = this.props;

    if (result.isError) {
      return <ErroSection error={result.error} />;
    } 

    const TH = ({
      sortable, field, className, ...otherProps
    }) => {
      return (
        <SortableTH
          onClick={}
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
  const entitesQuery = {};
  
}