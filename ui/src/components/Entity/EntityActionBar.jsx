import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Boundary, Button, ButtonGroup, ControlGroup, Divider, OverflowList, Popover } from '@blueprintjs/core';
import c from 'classnames';
import { ResultText, SearchBox, UpdateStatus } from 'components/common';
import { selectEntitiesResult } from 'selectors'

import './EntityActionBar.scss';

class EntityActionBar extends Component {
  overflowListRenderer = (overflowItems) => {
    const menuContent = overflowItems.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>);
    return (
      <Popover
        content={<ButtonGroup vertical minimal alignText="left">{menuContent}</ButtonGroup>}
        position="bottom-left"
        minimal
        popoverClassName="EntityActionBar__overflow-list"
        boundary="viewport"
      >
        <Button icon="caret-down"/>
      </Popover>
    )
  }
 
 
 
  render(){
    const { children, query, result, onSearchSubmit, searchDisabled, searchPlaceholder, updateStatus, writeable } = this.props;
    const showActions = writeable && children;
    const resultText = query.hasQuery() && <ResultText result={result} /> ;
    return(
      <div className="EntityActionBar">
        <ControlGroup fill className={c({"show-status":!!updateStatus})}>
          <OverflowList
            items={showActions ? children : [resultText]}
            collapseFrom={Boundary.END}
            observeParents
          />
          <div className="EntityActionBar__right">
            {updateStatus && (
              <>
              <UpdateStatus status={updateStatus} />
              <Divider/>
              </>
            )}
            <SearchBox
              onSearch={onSearchSubmit}
            />
          </div>
        </ControlGroup>
        
        Entity Action Bar
      </div> 
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { query } = ownProps;
  return {
    result: selectEntitiesResult(state, query)
  }
}

export default connect(mapStateToProps)(EntityActionBar);