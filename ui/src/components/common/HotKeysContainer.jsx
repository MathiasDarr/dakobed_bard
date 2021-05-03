import React from 'react';
import { Hotkeys, Hotkey, HotkeysTarget } from '@blueprintjs/core';

class HotKeysContainer extends React.PureComponent {
  constructor(props){
    super(props);
    this.focusSearchBox = this.focusSearchBox.bind(this)
  }

  focusSearchBox(){
    const searchBox = document.querySelector('#search-box');
    if (searchBox){
      searchBox.focus();
    }
  }

  renderHotkeys() {
    const { hotKeys = [] } = this.props;
    return (
      <Hotkeys>
        <Hotkey combo="/" label="Search" global onKeyUp={this.focusSearchBox} />
        {hotKeys.map(hotKey => (
          <Hotkey 
            key={hotKey.combo + hotKey.group}
            {...hotKey}
          />
        ))}
      </Hotkeys>
    )
  }

  render(){
    return this.props.children;
  }
}

function HotKeysContainerFunc() {}
HotKeysContainerFunc.prototype = Object.create(HotKeysContainer.prototype);

export default HotkeysTarget(HotKeysContainerFunc);