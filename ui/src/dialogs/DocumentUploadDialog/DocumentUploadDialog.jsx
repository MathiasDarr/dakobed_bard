import React, { Component } from 'react';
import axios from 'axios';

import {
  Classes, Dialog
} from '@blueprintjs/core';

import { compose } from 'redux';
import { connect } from 'react-redux';

import './DocumentUploadDialog.scss';

const messages = {
  title: 'Upload Documents'
};

export class DocumentUploadDialog extends Component {
  constructor(props){
    super(props)
  }

  renderContext() {
    return (
    <div> 
      Dfadfa
    </div>)
  }

  render() {
    const { isOpen } = this.props;
    return(
      <Dialog 
        icon="upload"
        className="DocumentUploadDialog"
        isOpen={isOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          {this.renderContext()}
        </div>
      </Dialog>
    )
  }
}

export default DocumentUploadDialog;