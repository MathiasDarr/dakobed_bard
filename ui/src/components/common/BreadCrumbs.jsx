import React, { PureComponent, Component } from 'react';
import { ControlGroup, Divider, Icon } from '@blueprintjs/core';
import c from 'classnames';

import { Collection, Skeleton } from 'components/common';

import './BreadCrumbs.scss';

class CollectionBreadcrumb extends PureComponent {
  renderSkeleton() {
    return(
      <li>
        <Skeleton.Text type="span" length={20} className="bp3-breadcrumb" />
      </li>
    )
  }

  render(){
    return(
      <div></div>
    )
  }
}


// class TextBreadcrumb extends PureComponent {
//   render() {
//     const { children } = this.props;
//     if (!children) {
//       return null;
//     }
//     const className = c('bp3-breadcrumb', {'bp3-breadcrumb-current': active })
//     return (
//       <li key={key || 'text'}>
//         <span className={className}>
//           {icon && <Icon icon={icon} />}
//           {children}
//         </span>
//       </li>
//     )
//   }
// }



export default class Breadcrumbs extends Component {
  static Collection = CollectionBreadcrumb;
  

  renderOperations() {
    const { status } = this.props;
    return(
      <ControlGroup>
        {status}        
      </ControlGroup>

    )
  }

  render() {
    const { children, type } = this.props
    return (
      <nav className={c("Breadcrumbs", type)}>
        {/* <div className="Breadcrumbs__inner-container">
          <div className="Breadcrumbs__main">
            <ul className="bp3-breadcrumbs">
              {children}
            </ul>
          </div>
        </div>
        <div className="Breadcrumbs__right">
          {this.renderOperations()}
        </div> */}
      </nav>
    )
  }
}
