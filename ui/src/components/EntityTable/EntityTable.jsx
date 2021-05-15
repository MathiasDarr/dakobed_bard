import React, { Component } from 'react';
import { Divider } from '@blueprintjs/core';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import './EntityTable.scss';


export class EntityTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: []
    };
  }

  componentDidMount(){
    this.fetchIfNeeded()
  }

  componentDidUpdate(){

  }

  fetchIfNeeded(){

  }

  render(){
    return(
      <div className="EntityTable">
        
      </div>
    )
  }
}