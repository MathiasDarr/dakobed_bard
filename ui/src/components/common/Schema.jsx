import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import { selectModel } from 'selectors';
import CollectionView from 'components/Collections/CollectionView';
import collectionViewIds from 'components/Collections/collectionViewIds'


function SchemaLink({ collection, location, schema, ...rest }) {
  if(schema.isDocument()){
    return <CollectionView.Link collection={collection} id={collectionViewIds.DOCUMENTS} icon />
  } else {
    
  }
}

class Label extends Component {
  render(){
    return(
      <div>
        SCHEMA LABEL
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { schema } = ownProps;
  return { schema: selectModel(state).getSchema(schema) };
}


class Schema extends Component {
  static Label = connect(mapStateToProps)(Label);
}

export default Schema;