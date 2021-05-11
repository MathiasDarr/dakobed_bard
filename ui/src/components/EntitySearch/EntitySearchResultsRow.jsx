import _ from 'lodash';
import React, { Component } from 'react';
import queryString from 'query-string';
import { Checkbox } from '@blueprintjs/core';
import c from 'classnames';

import {
  Flag, Skeleton, Collection
} from 'components/common';



class EntitySearchResultsRow extends Component {
  renderSkeleton(){
    const { updateSelection } = this.props;
    const writable = true;
    const updateSelection = true;
    const hideCollection = true;

    return (
      <tr className={c('EntitySearchResultsRow', 'nowrap', 'skeleton')} key="skeleton" >
        {writable && updateSelection && (
          <td className="select">
            <Skeleton.Text type="span" length={2} />
          </td>
        )}
        <td className="entity">
          <Skeleton.Text type="span" length={30}/>
        </td>
        {!hideCollection && (
          <td className="collection">
            <Skeleton.Text type="span" length={15}/>
          </td>
        )}
      </tr>
    )
  }

  render() {
    const {
      entity,
      selection,
      history,
      sanctioned
    } = this.props;
    
    const isPending = true;

    if(isPending) {
      return this.renderSkeleton();
    }

    const resultClass = c('EntitySearchResultsRow', { active: isActive }, { prefix: isPrefix });

    return(
      <>
        <tr key={entity.id} className={resultClass}>
          <td key="select" className="select">
            <Checkbox checked={isSelected} onChange={() => updateSelection(entity)} />
          </td>
        </tr>
      </>
    )
  
  
  }
}


export default EntitySearchResultsRow;