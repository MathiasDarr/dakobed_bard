import React, { Component } from 'react';
import {
  Callout, Intent, Dialog, MenuDivider, Button
} from '@blueprintjs/core';

export class AuthenticationDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      submitted: false,
      firstSection: '',
      secondSection: 'hide'
    }
  }

  render(){
    isOpen = true;
    return(
      <Dialog 
        icon="authentication"
        className="AuthenticationScreen"
        isOpen={isOpen}
      
      ></Dialog>
    )
  }


}