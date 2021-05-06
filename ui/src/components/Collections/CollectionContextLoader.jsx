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
    this.fetchRefresh = this.fetchRefresh.bind(this);
  }

  componentDidMount(){
    this.fetchRefresh();
    this.fetchIfNeeded();    
  }

  componentDidUpdate(){
    this.fetchIfNeeded();
  }

  componentWillUnmount(){
    clearTimeout(this.state.timeout);
  }

  fetchIfNeeded(){
    const { collectionId, collection } = this.props;
    const refresh = false;
    this.props.fetchCollection({id: collectionId, refresh });
  }


  fetchRefresh(){
    const { collection } = this.props;
    const { status } = collection;
    clearTimeout(this.state.timeout);
    console.log("adfadfafd adf fetch ")
    this.props.fetchCollection(collection);
  
    
  
  }

  render(){
    console.log("THE PROPS LOOK LIKE ", this.props);
    return(
      <div>
        i want to grab collections from the api..
      </div>
    )
    // return this.props.children;
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