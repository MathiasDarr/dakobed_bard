import { PureComponent } from "react";

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchCollection } from 'actions';
import { selectCollection } from 'selectors';



class CollectionContextLoader extends PureComponent {
  constructor(props){
    super(props);
    this.state = { timeout: null };
  }

  componentDidMount(){
    
  }

  componentDidUpdate(){

  }

  render(){
    return this.props.children;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { location, collectionId } = ownProps;
  return {
    collection: selectCollection(state, collectionId)
  };
};

const mapDispatchToProps = {
  fetchCollection
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(CollectionContextLoader);