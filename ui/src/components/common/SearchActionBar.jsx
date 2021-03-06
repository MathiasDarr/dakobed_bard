import React from 'react';
import { ControlGroup } from '@blueprintjs/core';
import { ResultText } from 'components/common'


import './SearchActionBar.scss';

class SearchActionBar extends React.Component {
  render(){
    const { children, result } = this.props;
    return(
      <ControlGroup className="SearchActionBar" fill>
      <div className="SearchActionBar__main">
        <ResultText result={result} />
      </div>
      { children }
    </ControlGroup>
    )
  }
}

export default SearchActionBar;

// const SearchActionBar = ({children, result }) => {
//   return(
    // <ControlGroup className="SearchActionBar" fill>
    //   <div className="SearchActionBar__main">
    //     <ResultText result={result} />
    //   </div>
    //   { children }
    // </ControlGroup>
//   )
// }

// export default SearchActionBar;