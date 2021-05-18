import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import queryString from 'query-string';
import { ButtonGroup } from '@blueprintjs/core';

import EntityContextLoader from 'components/Entity/EntityContextLoader';
import Screen from 'components/Screen/Screen';
import CollectionWrapper from 'components/Collections/CollectionWrapper';
import { Breadcrumbs, DualPane, Schema} from 'components/common';
import { withRouter, Redirect } from 'react-router';

import { selectEntity, selectEntityView } from 'selectors';
import { deleteEntity } from 'actions';


class EntityScreen extends Component {
  render(){
    const { entity, entityId, parsedHash } = this.props;

    // if (entity.profileId && parsedHash.profile === undefined) {
    //   parsedHash.via = entity.id;
    //   return <Redirect />
    // }

    // const operation = (

    //   <ButtonGroup>
        
    //   </ButtonGroup>
    // )



    return(
      <EntityContextLoader>
        <Screen>
          <div>
            Helloa
          </div>
        </Screen>        
      </EntityContextLoader>

    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { location, match } = ownProps;
  const { entityId } = match.params;
  const entity = selectEntity(state, entityId);
  
  return {};
};



export default compose(
  withRouter,
  connect(mapStateToProps, { deleteEntity })
)(EntityScreen);