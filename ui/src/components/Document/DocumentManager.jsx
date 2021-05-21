import _ from 'lodash';
import React, { Component } from 'react';
import { AnchorButton, Callout, Divider, Tooltip } from '@blueprintjs/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import EntitySearch from 'components/EntitySearch/EntitySearch';
import { DialogToggleButton } from 'components/Toolbar';
import DocumentFolderDialog from 'dialogs/DocumentFolderDialog/DocumentFolderDialog';
import EntityActionBar from 'components/Entity/EntityActionBar';
import EntityDeleteButton from 'components/Toolbar/EntityDeleteButton';
import getEntityLink from 'util/getEntityLink';
import { DocumentUploadDialog } from 'dialogs/DocumentUploadDialog/DocumentUploadDialog';



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
  updateQuery(newQuery) {
    const { history, location } = this.props;
    history.push({
      pathname: location.pathname,
      search: newQuery.toLocation(),
      hash: location.hash
    })
  }

  onSearchSubmit(queryText) {
    const { query } = this.props;
    const newQuery = query.set('q', queryText);
    this.updateQuery(newQuery);
  } 


  render(){
    console.log("DRILL IS NOT REQUIRED")

    const { 
      collection, document, query, result, hasPending
    } = this.props;
    const { selection } = this.state;
    // const canUpload = this.canUpload();
    const canUpload = true;
    const emptyComponent = (
      <div className="DocumentManager__content__empty">
        <DialogToggleButton
          buttonProps={{
            minimal: true,
            fill: true
          }}
          Dialog={DocumentUploadDialog}
          dialogProps={{ collection, parent: document }}
        />
      </div>
    )

    return(
      <div className="DocumentManager">
        <EntityActionBar 
          query={query}
          selection={selection}
        ></EntityActionBar>
        <div className="DocumentManager__content">
        </div>
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