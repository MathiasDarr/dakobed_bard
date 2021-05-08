import React, { Component } from 'react';
import { Alert, Intent } from '@blueprintjs/core';
import { Collection } from 'components/common';

const messages = {
  button_confirm: 'Delete',
  button_cancel: 'Cancel'
}

class CollectionDeleteDialog extends Component {
  constructor(props){
    super(props);
    this.onDelete = this.onDelete.bind(this)
  }

  async onDelete(){

  }

  render(){
    const { collection } = this.props;
    return(
      <Alert

      >

      </Alert>
    )
  }
}

export default CollectionDeleteDialog;