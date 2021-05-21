import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Alert, Icon, Intent, Spinner } from '@blueprintjs/core';
import { compose } from 'redux';

import './EntityDeleteDialog.scss';

export class EntityDeleteDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      blocking: false,
      processingEntity: null,
      deletedEntities: []
    }
    this.onDelete = this.onDelete.bind(this);
  }

  async onDelete(){

  }

  render(){
    return (
      <Alert
        isOpen={this.props.isOpen}
      />
    )
  }
}

export default compose (
  withRouter
)(EntityDeleteDialog);