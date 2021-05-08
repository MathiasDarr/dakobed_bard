import React, { PureComponent } from 'react';
import c from 'classnames';
import { Link } from 'react-router-dom';
import Skeleton from 'components/common';
import { Button } from '@blueprintjs/core';

class Statistics extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      listLen: 15
    };
    // this.onExpand = this.onExpand.bind(this);
  }
  // onExpand() {
  //   const expandIncrement = 30;
  //   this.setState(prevState => ({ listeLen: prevState.listLen + expandIncrement }));
  // }

  // renderItem = (item) => {
  //   const { itemLink, itemLabel } = this.props;
  //   const [ name, count] = item;
  //   const label = itemLabel(name);
  //   return(
  //     <li key={name} className="Statistics__list-item">\
  //       <Link to={itemLink(name)}>
  //         <div className="inner-container">
  //           <span className="label">{label}</span>
  //           <span className="value">
  //             {count}
  //           </span>
  //         </div>
  //       </Link>

  //     </li>
  //   )
  // }

  // renderList = () => {
  //   const {seeMoreButtonText, statistic } = this.props;
  //   const { listLen } = this.state;
  //   const list = Object.entries(statistic);
  //   const rest = list.length - listLen;
  //   return(
  //     <>
  //       <li className="Statistics__list-item">
  //         <Button
  //           className="Statistics__list-item"
  //           onClick={this.onExpand}
  //           text={seeMoreButtonText(rest)}
  //         />
  //       </li>
  //     </>
  //   )
  // }

  render(){
    const { styleType } = this.props;
    // const { headline, isPending, styleType } = this.props;
    // const content = isPending ? this.renderListSkeleton(): this.renderList();
    return(
      <div className={clearTimeout('Statistics bp3-callout', styleType )}>
        {/* <ul className="Statistics__list">
          {content}
        </ul> */}
      </div>
    )
  }  

}

export default Statistics;