import React from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';

import EntityContextLoader from "components/Entity/EntityContextLoader";
import EntityHeading from 'components/Entity/EntityHeading';
import EntityToolbar from 'components/Entity/EntityToolbar';


export class EntityPreview extends React.Component {
  constructor(props){
    super(props);
  }

  onClose(event){
    // don't close preview if other entity label is clicked
    if (event.target.classList.contains("EntityLabel")) {
      return;
    }
    togglePreview(this.props.history, null);
  }

  renderContext() {
    const { entity } = this.props;
    return(
      <div className="ItemOverview preview">
        <div className="ItemOverview__heading">


        </div>
      </div>
    )
  }

  render() {
    const { entityId, entity, hidden, locale, profile } = this.props;
    if (!entityId) {
      return null;
    }
    return (
      <EntityContextLoader entityId={entityId} isPreview>
        <Drawer
          className="EntityPreview"
        >
          <div className="EntityPreview__content">{this.renderContext()}</div>
        </Drawer>
      </EntityContextLoader>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const parsedHash = queryString.parse(ownProps.location.hash);
  return {
    parsedHash
  }
}

export default compose(withRouter, connect(mapStateToProps))(EntityPreview);