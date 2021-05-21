import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Boundary, Button, ButtonGroup, ControlGroup, Divider, OverflowList, Popover } from '@blueprintjs/core';
import c from 'classnames';
import { ResultText, SearchBox, UpdateStatus } from 'components/common';


import { selectEntitiesResult } from 'selectors'

import './EntityActionBar.scss';

class EntityActionBar extends Component {

  constructor(props){
    super(props);
  }
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
    const { children, query, result, onSearchSubmit, searchDisabled, searchPlaceholder, updateStatus } = this.props;
    // const showActions = writeable && children;
    // const resultText = query.hasQuery() && <ResultText result={result} /> ;
    const resultText = "pollution"
    const writeable = true;
    const showActions = writeable && children
    console.log("THE WRITEABLE LOOKS LIKE ", writeable)
    // const { onSearchSubmit } = this.props;
    return(
      <div className="EntityActionBar">
         <ControlGroup fill >
          {/* {<OverflowList
             items={showActions ? children : [resultText]}
             collapseFrom={Boundary.END}
             visibleItemRenderer={(item, i) => <React.Fragment key={i}>{item}</React.Fragment>}
             overflowRenderer={this.overflowListRenderer}
             className="bp3-button-group"
             minVisibleItems={showActions ? 0 : 1}
             observeParents
          /> */}
          
          
          { children }

          <div className="EntityActionBar__right">
            <SearchBox
              onSearch={onSearchSubmit}
            />
          </div>
         </ControlGroup>

        {/* <ControlGroup fill className={c({"show-status":!!updateStatus})}>
          <OverflowList
            items={showActions ? children : [resultText]}
            collapseFrom={Boundary.END}
            visibleItemRenderer={(item, i) => <React.Fragment key={i}>{item}</React.Fragment>}
            overflowRenderer={this.overflowListRenderer}
            className="bp3-button-group"
            observeParents
          />
          <div className="EntityActionBar__right">
            {updateStatus && (
              <>
              <UpdateStatus status={updateStatus} />
              <Divider/>
              </>
            )}

          </div>
        </ControlGroup>
        
        Entity Action Bar */}
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


