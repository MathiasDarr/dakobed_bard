import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button, Icon, Menu, MenuDivider, MenuItem, Popover, Position
} from '@blueprintjs/core'

const messages = {
  notifications: "Notifications",
  settings: "Settings"
}


export class AuthButtons extends Component {
  render(){
    return(
      <span className ="AuthButtons">
        <Popover 
          content={(
            <Menu className="AuthButtons__popover">
              <Link to="/datasets" className="bp3-menu-item">
                <Icon icon="notifications" />
                {' '}
                {' '}
                <div>
                  {messages.notifications}
                </div>
              </Link>
              <MenuDivider />
              <Link to="/settings" className="bp3-menu-item">
                <Icon icon="cog" />
                {' '}
                {' '}
                <div className="bp3-text-overflow-ellipsis bp3-fill">
                  {messages.settings}
                </div>
              </Link>
              <MenuItem icon="log-out" href="/logout" text="Sign Out" /> 
            </Menu>
          )}
          position={Position.BOTTOM_LEFT}
          fill
        >
          <Button icon="user" className="bp3-minimal" rightIcon="caret-down" text='Profile' />
        </Popover>
      </span>
    )
  }
}

export default AuthButtons;