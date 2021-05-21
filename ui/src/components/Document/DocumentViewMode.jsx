import React, { lazy, Suspense } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import DefaultViewer from 'viewers/DefaultViewer';
import ImageViewer from 'viewers/ImageViewer';


import './DocumentViewMode.scss';

class DocumentViewMode extends React.Component {
  renderContent(){
    const { document, queryText, activeMode, dir } = this.props;
    const processingError = document.getProperty('processingError');

    if (processingError && processingError.length) {
      return <DefaultViewer document={document} dir={dir} />
    }

    if (document.schema.isA('Image')) {
      if (activeMode === 'text' ) {
        return(
          <TextViewer document={document} activeMode={activeMode} dir={dir}/>
        );
      }

      return (
        <ImageViewer
          document={document}
          activeMode={activeMode}
          dir={dir}
        />
      );
    }

    if (document.schema.isA('Folder')) {
      return (
        <FolderViewer document={document} dir={dir} />
      );
    }

    return <DefaultViewer document={document} dir={dir} />
    // if (document.schema.isA('Audio')) {
    //   return (
    //     <AudioViewer document={document} dir={dir} />
    //   );
    // }

    // if (document.schema.isA('Table')){
    //   return (
    //     <VideoViewer document={document} dir={dir} />
    //   )
    // }

    // if (document.schema.isA('PlainText')) {
    //   return (
    //     <TextViewer document={document} queryText={queryText} dir={dir}/>
    //   );
    // } else {
    //   return (
    //     <HtmlViewer document={document} queryText={queryText} dir={dir} />
    //   )
    // }
  }
  
  render(){
    return(
      <div className="DocumentViewMode">
        {this.renderContext()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { document } = ownProps;
  return {
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)
(DocumentViewMode)