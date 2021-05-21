import _ from 'lodash';
import React, { Component } from 'react';
import { AnchorButton, Callout, Divider, Tooltip } from '@blueprintjs/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';


import { DialogToggleButton } from 'components/Toolbar';
import DocumentFolderDialog from 'dialogs/DocumentFolderDialog/DocumentFolderDialog';
import EntityActionBar from 'components/Entity/EntityActionBar';
import getEntityLink from 'util/getEntityLink';



const messages = {
  empty: 'No files or directories',
  emptyCanUpload: 'No files or directoreis.  Drop files or click to upload',
  search_placeholder: 'Search documents',
  new: 'New folder',
  upload: 'Upload',

}

export class DocumentManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: []
    };

  }

  render(){
    return(
      <div className="DocumentManager">

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { collection } = ownProps;

  return {}
}

export default compose(
  withRouter,
  connect(mapStateToProps, {})
)(DocumentManager);