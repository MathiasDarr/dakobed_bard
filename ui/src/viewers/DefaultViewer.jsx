import React, { PureComponent } from 'react';

import { ErrorSection } from 'components/common';
 
const messages = {
  no_viewer: 'No preview is available for this document',
  ignored_file: "THe system does not work with these types of files. Please download it so youll be able to see"
}

export class DefaultViewer extends PureComponent {
  render() {
    const { document } = this.props;
    const backendMessage = document.getProperty('processingError').join(', ');
    // const message = backendMessage || {messages.ignored_file}
    
    const message = backendMessage || messages.ignored_file

    return(
      <ErrorSection
        icon="issue"
        title={messages.no_viewer}
        description={message}
      />
    )
  }
}

export default DefaultViewer;