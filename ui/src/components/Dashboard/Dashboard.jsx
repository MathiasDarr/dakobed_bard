import React, { Component } from 'react';
import { Classes, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import c from 'classnames';

const messages = {
  
}

class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  componentDidUpdate(){
  
  }

  fetchIfNeeded(){

  }

  navigate(path){
    this.props.history.push(path);
  }

  render(){
    return(
      <div className="Dashboard">
        <div className="Dasboard__inner-container">
          <div className="Dashboard__menu">
            <Menu>
              <li className="bp3-menu-header">
                <h6 className="bp3-heading">
                  Activity
                </h6>
              </li>
              <MenuItem
                icon="feed"
                text

              />

              <MenuItem
                icon="feed"
                text

              />

              <MenuDivider />

              <MenuItem
                icon="feed"
                text

              />
            </Menu>
          
          </div>
          <div className="Dashboard__body">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard