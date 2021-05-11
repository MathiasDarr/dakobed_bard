import React, { Component } from 'react';
import "./Flag.scss";

class Flag extends Component {
  render() {
    const { flagType } = this.props;
    return <div className={`flag ${flagType}`}>{flagType}</div>
  }
}

export default Flag;