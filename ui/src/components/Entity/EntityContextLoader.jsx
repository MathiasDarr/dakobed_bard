import { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  fetchEntity, queryEntities
} from 'actions'


class EntityContextLoader extends PureComponent {
  componentDidMount() {

  }

  componentDidUpdate() {
    
  }

  fetchIfNeeded(){

  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { entityId, location } = ownProps;
}


const mapDispatchToProps = {
  queryEntities,
  fetchEntity
}
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EntityContextLoader);