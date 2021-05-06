import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import CollectionIndex from 'components/CollectionIndex/CollectionIndex';
import './CollectionIndexScreen.scss'
class CollectionIndexScreen extends React.Component {

  constructor(props){
    super(props)
  }
  
  render(){
    return(
      <div>
          Indices
      </div>
    )
  }
}

export default CollectionIndexScreen;