import React, { PureComponent } from 'react';

import './DocumentUploadForm.scss';

export class DocumentUploadForm extends PureComponent {
  onFilesChange = (event) => {
    const files = Array.from(event.target.files).filter(file => file.type !== '');
    this.props.onFilesChange(files);
  }
  render(){
    return(
      <div className="DocumentUploadForm" >
        <div className="bp3-input-group bp3-large bp3-fill">
          <label
            className="bp3-file-input bp3-largee bp3-fill"
            htmlFor="file-input"
          >
            <input
              id="file-input"
              type="file"
              multiple
              onChange={this.onFilesChange}
            />
            <span className="bp3-file-upload-input">
              Choose files to upload
            </span>
          </label>
        </div>
        <p className="DocumentUploadForm__secondary">
          
        </p>
      </div>
    )
  }
}