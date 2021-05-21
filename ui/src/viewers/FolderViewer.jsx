import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import DocumentDropzone from 'components/Document/DocumentsDropzone';
import DocumentManager from 'components/Document/DocumentManager';

import './FolderViewer.scss';

class FolderViewer extends Component {
  render() {
    const { document, query } = this.props;
    return (
      <div className="FolderViewer">
        <DocumentDropzone
          canDrop={document.collection.writeable}
          collection={document.collection}
          document={document}
        >
          <DocumentManager
            query={query}
            collection={document.collection}
            document={document}
          />
        </DocumentDropzone>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { document, location } = ownProps;
  return {
    query: {"folderDocumentsQuery": 1}
  }
}

FolderViewer = connect(mapStateToProps)(FolderViewer);
FolderViewer = withRouter(FolderViewer);
export default FolderViewer;