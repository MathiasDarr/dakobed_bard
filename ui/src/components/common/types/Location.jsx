import { Component } from 'react';
import { connect } from 'react-redux';

import { selectModel } from 'selectors';

const mapStateToProps = (state) => {
  const model = selectModel(state);
  return { fullList: model.types.location.values}
}

 
class Location extends Component {
  
}

export default Location;