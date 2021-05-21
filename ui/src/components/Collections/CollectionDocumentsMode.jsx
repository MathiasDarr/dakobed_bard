import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import DocumentManager from 'components/Document/DocumentManager';
import { collectionDocumentsQuery } from 'queries';
import { selectCollection } from 'selectors';

const mapStateToProps = (state, ownProps) => {
  const { collectionId, location } = ownProps;
  return {
    collection: selectCollection(state, collectionId)
  }
}



export default compose(
  withRouter,
  connect(mapStateToProps)
)(DocumentManager)