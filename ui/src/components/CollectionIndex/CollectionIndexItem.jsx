import React, { PureComponent } from 'react';

import { Icon, H4 } from '@blueprintjs/core';

import {
  Collection, Skeleton
} from 'components/common';

class CollectionIndexItem extends PureComponent {
  render(){

    const { collection } = this.props;

    return(
      <li  className="index-item" key={Collection.id}>
        <H4 className="index-item__title">
          <Collection.Link className="index-item__title__text" collection={collection} icon />
        </H4>
      </li>
    )
  }
}

export default CollectionIndexItem;