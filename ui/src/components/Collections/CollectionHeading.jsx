import React, { PureComponent } from 'react';
import c from 'classnames';

import './CollectionHeading.scss';

class CollectionHeading extends PureComponent {
  render(){
    return(
      <div className={c("CollectionHeading", {"padded": true})}>
        
        dfadfa 
        
        <div className="bp3-text-muted CollectionHeading__subheading">
          Category links..
        </div>
        <h2 itemProp="name" className="CollectionHeading__title">
          Collection Component
        </h2>
      </div>
    )
  }
}

export default CollectionHeading;