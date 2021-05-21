import React, { PureComponent } from 'react';
import { Button, Checkbox, Icon, Intent } from '@blueprintjs/core';
import convertPathsToTree from 'util/convertPathsToTree';

import './DocumentUploadView.scss';

const messages = {
  save: 'Upload',
  summary: '{numberOfFiles, number} files'
}


export class DocumentUploadView extends PureComponent {
  constructor(props){
    super(props);
    
  }

  submit(){
    const { filesToUpload } = this.state;
    this.props.onSubmit(filesToUpload);
  }

  toggleFile(file) {
    this.setState(({ filesToUpload }) => ({
      filesToUpload: filesToUpload.includes(file)
        ? filesToUpload.filter(f => f !== file)
        : [...filesToUpload, ...[file]]
    }));
  } 


  renderFolder(folder){
    return Object.entries(folder).map(([key, value]) => {
      if (value instanceof File) {
        return this.renderFile(value);
      }

      return (
        <div className="DocumentUploadView__folder" key={key}>
          <h6 className="DocumentUploadView__folder__label bp3-heading">
            <Icon icon="folder-open" className="left-icon" />
            {key}
          </h6>
          <div className="DocumentUploadView__folder__content">
            {this.renderFolder(value)}
          </div>
        </div>
      )
    })
  }

  renderFile(file){
    return(
      <Checkbox 
        defaultChecked
        key={file.name}
        label={file.name}
        onChange={() => this.toggleFile(file)}
      />
    );
  }


  render(){
    const { files } = this.props;
    const { filesToUpload } = this.state;

    const fileTree = convertPathsToTree(files);
    const totalFileSize = files.reduce((totalSize, file) => totalSize + file.size, 0);

    return(
      <div className="DocumentUploadView">
        <div className="DocumentUploadView__content">
          {this.renderFolder(fileTree)}
        </div>

        <p>
          {messages.summary}
          
        </p>

        <div className="bp3-dialog-footer">
          <div className="bp3-dialog-footer-actions">
            <Button
              type="submit"
              intent={Intent.PRIMARY}
              text={messages.save}
              onClick={this.submit}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default DocumentUploadView;