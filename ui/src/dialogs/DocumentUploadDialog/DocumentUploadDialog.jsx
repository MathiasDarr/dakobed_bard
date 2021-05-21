import React, { Component } from 'react';
import axios from 'axios';
import {
  Classes, Dialog
} from '@blueprintjs/core';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { ingestDocument as ingestDocumentAction} from 'actions';
import { UPLOAD_STATUS } from './DocumentUploadStatus';

import DocumentUploadView from './DocumentUploadView';
import DocumentUploadForm from './DocumentUploadForm';


import './DocumentUploadDialog.scss';

const messages = {
  title: 'Upload Documents'
};

export class DocumentUploadDialog extends Component {
  constructor(props){
    super(props)
  }

  uploadFile(file, parent) {
    const uploadTrace = {
      name: file.name,
      size: file.size,
      type: 'file',
      uploaded: 0,
      total: file.size,
      status: UPLOAD_STATUS.PENDING
    };

    const metadata = {
      file_name: file.name,
      mime_type: file.type
    };
    if(parent?.id) {
      metadata.parent_id = parent.id;
    }
    const retryFn = () => this.uploadFile(file, parent);

    return this.doTracedIngest(metadata, null, uploadTrace, retryFn);
  }

  uploadFolder(title, parent, retryFn) {
    const uploadTrace = {
      name: title,
      type: 'directory',
      status: UPLOAD_STATUS.PENDING
    };

    const metadata = {
      file_name: title,
      foreign_id: title
    };
    if (parent?.id) {
      metadata.foreign_id = `${parent.id}/${title}`;
      metadata.parent_id = parent.id;
    }
    return this.doTracedIngest(metadata, null, uploadTrace, retryFn);
  }

  uploadFolderRecursive(title, parent, childTree) {
    const retryFn = () => this.uploadFolderRecursive(title, parent, childTree);
    return this.uploadFolder(title, parent, retryFn)
      .then(result => {
        if(result?.id) {
          return this.traverseFileTree(childTree, { id: result.id, foreign_id: title });
        }
      });
  }




  renderContext() {
    const { files, uploadTraces, uploadMeta } = this.state;

    if(uploadMeta) {
      return (
        <div>
          DOCUMENT UPLOAD STATUS
        </div>
      )
    }
    if (files && files.length) {
      return <DocumentUploadView files={files} onSubmit={this.onFormSubmit} />;
    }
    return <DocumentUploadForm onFilesChange={this.onFilesChange}/>;
  }

  render() {
    const { isOpen } = this.props;
    const closeable = true;
    return(
      <Dialog 
        icon="upload"
        className="DocumentUploadDialog"
        canOutsideCLickClose={closeable}
        canEscapeKeyClose={closeable}
        title={messages.title}
        isCloseButtonShown={closeable}
        isOpen={isOpen}
        onClose={this.onClose}
      >
        <div className={Classes.DIALOG_BODY}>
          {this.renderContext()}
        </div>
      </Dialog>
    )
  }
}

const mapDispatchToProps = { ingestDocument: ingestDocumentAction };


export default compose(
  connect(null,mapDispatchToProps)
)(DocumentUploadDialog);