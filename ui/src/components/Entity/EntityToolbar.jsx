import React from 'react';
import { Link } from 'react-router-dom';

import { ButtonGroup, Icon } from '@blueprintjs/core';
import getEntityLink from 'util/getEntityLink';

import './EntityToolbar.scss';

class EntityToolbar extends React.Component {
  render() {
    return(
      <div className="EntityToolbar">
        <ButtonGroup minimal className="EntityToolbar__buttons bp3-intent-primary">
          {isThing && (
            <Link to={getEntityLink(entity, profile)} className="bp3-button">
              <Icon icon="fullscreen" className="left-icon" />
              {"Expand"}
            </Link>
          )}
          
        </ButtonGroup>
      </div>
    ) 
  }
}

export default EntityToolbar;