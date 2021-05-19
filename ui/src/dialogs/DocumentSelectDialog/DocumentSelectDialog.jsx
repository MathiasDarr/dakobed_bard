import React, { Component } from 'react';
import { Classes, Dialog } from '@blueprintjs/core';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Entity } from 'components/common';

import CollectionView from 'components/Collection/CollectionView';
import collectionViewIds from 'components/Collection/collectionViewIds';

import './DocumentSelectDialog.scss';

const messages = {
  no_results: 'No matching documents found',
  placeholder: 'Select a table document'
}


class DocumentSelectDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  componentDidUpdate(prevProps){
    if (!prevProps.isOpen && this.props.isOpen) {
      this.onQueryChange();
    }
  }

  onQueryChange(queryText) {
    const { collection, location } = this.props;
  
  }

  render() {
    const { collection, schema, title, toggleDialog, isOpen, onSelect } = this.props;
    const { query } = this.state;
    return (
      <Dialog
        className="DocumentSelectDialog"
        isOpen={isOpen}
        title={title}
        onClose={toggleDialog}
      >
        <div className={Classes.DIALOG_BODY}>
          <p>
            values={{ schema: schema && <strong><schema.Label schema={schema.Label} /></strong> }}
          </p> 
        </div>
      </Dialog>
    )
  }
}