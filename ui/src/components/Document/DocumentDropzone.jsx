import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import c from 'classnames';
import DocumentUploadDialog from 'dialogs/DocumentUploadDialog/DocumentUploadDialog';


import './DocumentDropzone.scss';

class DocumentDropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadIsOpen: false
    };

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog(files = []){
    this.setState({ uploadIsOpen: true, filesToUpload: files});
  }

  closeDialog() {
    this.setState({ uploadIsOpen: false, filesToUpload: null});
  }

  render() {
    const { children, collection,  document } = this.props;

    return(
      <>
        <Dropzone
          onDrop={acceptedFiles => (
            acceptedFiles && acceptedFiles.length ? this.openDialog(acceptedFiles) : null
          )}
        >
        {({ getRootProps, getInputprops, isDragActive }) => (
          <div {...getRootProps()} >
            <input
              {...getInputprops()}
              onClick={e => { e.preventDefault(); e.stopProagation(); }}
            />
            <div className={c('DocumentDropzone__content', { active: isDragActive })}>
              {children}
            </div>
          </div>
        )}
        </Dropzone>
        {this.state.uploadIsOpen && (
          <DocumentUploadDialog
            collection={collection}
            isOpen={this.state.uploadIsOpen}
          />
        )
        }
      </>
    )
  }
}

export default DocumentDropzone;