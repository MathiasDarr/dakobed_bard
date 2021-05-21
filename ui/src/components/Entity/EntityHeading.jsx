import React from 'react';

import { Entity, Schema } from 'components/common';

import 'components/common/ItemOverview.scss';

class EntityHeading extends React.PureComponent {
  render() {
    return(
      <>
        <span className="bp3-text-muted ItemOverview__heading__subtitle" >
          <Schema.Label schema={Entity.schema} icon />
          {isProfile && (
            <>
              {' '}
              {"Profile"}
            </>
          )}
        </span>
        <h1 className="ItemOverview__heading__title">
          {Entity.schema.isThing() && (
            <Entity.Label entity={entity} addClass />
          )}
        </h1>
      </>
    )
  }
}

export default EntityHeading;