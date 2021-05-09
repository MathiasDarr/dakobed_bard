import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar, Intent, Button, Tooltip } from '@blueprintjs/core';
import c from 'classnames';

const messages = {
  cancel_button: 'Cancel the process'
};

class CollectionStatus extends Component {
  constructor(props){
    super(props);
    this.onCancel = this.onCancel.bind(this);
  }

  render(){
    return(
      <div className={c('CollectionStatus', className)}>
        <div className="progress-area">
          <ProgressBar animate intent={Intent.PRIMARY} value={status.progress} />
          Progress Bar
        </div>
      </div>
    )
  }
}


export default CollectionStatus;