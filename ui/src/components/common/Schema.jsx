import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import { selectModel } from 'selectors';
import CollectionView from 'components/Collections/CollectionView';


function SchemaLink({ collection, location, schema, ...rest }) {
  if(schema.isDocument()){
    return <CollectionView.Link collection={collection} id={collectionViewIds.DOCUMENTS} icon />
  } else {
    
  }
}