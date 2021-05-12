import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthenticationDialog } from 'dialogs/AuthenticationDialog/AuthenticationDialog'

import {
  Button, Icon, Menu, MenuDivider, MenuItem, Popover, Position
} from '@blueprintjs/core'

import {fetchRole} from 'actions'

import { Skeleton } from 'components/common'

import './AuthButtons.scss';

import metadata from 'reducers/metadata';
import { selectCurrentRole, selectCurrentRoleId, selectMetadata } from 'selectors';

const messages = {
  notifications: "Notifications",
  settings: "Settings",
  lists: "Lists",
  signin: "Sign in",
  signout: "Sign out",
  status: "System status",

}


export class AuthButtons extends Component {

   constructor(props) {
     super(props);
   }

  componentDidMount() {
    this.fetchIfNeeded();
  }

  componentDidUpdate() {
    this.fetchIfNeeded();
  }

  fetchIfNeeded(){
    //console.log("THE PROPS AT AUTHBUTTONS ", this.props)
    // const { role, roleId } = this.props;
    // if (role.shouldLoadDeep){
    //   this.props.fetchRole({ id: roleId });
    // }
  }

  renderSkeleton() {
    return(
      <Skeleton.Text type="span" length="10" className="AuthButtons" />
    )
  }
  
  
  render(){
    const { role, metadata } = this.props
    //console.log("THE METADATA LOOKS LIKE ", metadata)
    //console.log("THE METADATA AUTH LOOKS LIKE ", metadata.auth)
    
    // if (!role.id && role.isPending){
    //     console.log("ADFAFAFAAAAAAAAAAAAAAAA")
    //    return this.renderSkeleton();
    // }

    var hasroleid = !!role.id

    // if(hasroleid){
    //   console.log("HAS ROLE ID")
    // }else{
    //   console.log("NO ROLE ID")
    // }

    if (!!role.id) {
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
                <MenuItem icon="log-out" href="/logout" text="Sign Out
                
                " /> 
              </Menu>
            )}
            position={Position.BOTTOM_LEFT}
            fill
          >
            <Button icon="user" className="bp3-minimal" rightIcon="caret-down" text='Profile' />
          </Popover>
        </span>
      );
    }


    if (metadata.auth.password_login_uri || metadata.auth.oauth_uri){
      return (
        <span className="AuthButtons">
            dfa 
          {/* <AuthenticationDialog /> */}
            {/* <DialogToggleButton 
              buttonProps={{
                text: messages.signin,
                icon: 'log-in',
                className: 'bp3-minimal'
              }}
              Dialog={AuthenticationDialog}
              dialogProps={{ auth: metadata.auth }}
            /> */}
        </span>
      )
    }

    return null;
  }
}

{/* <DialogToggleButton 
buttonProps={{
  text: messages.signin,
  icon: 'log-in',
  className: 'bp3-minimal'
}}
Dialog={AuthenticationDialog}
dialogProps={{ auth: metatdata.auth }}
/> */}

const mapStateToProps = (state) => ({
  role: selectCurrentRole(state),
  roleId: selectCurrentRoleId(state),
  metadata: selectMetadata(state)
})


export default connect(mapStateToProps, { fetchRole })(AuthButtons);
