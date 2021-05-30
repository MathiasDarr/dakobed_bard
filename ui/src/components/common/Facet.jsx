import React, { PureComponent } from 'react';
import { Icon } from '@blueprintjs/core';
import getFacetConfig from 'util/getFacetConfig';

class FacetLabel extends PureComponent {
  render(){
    const { field, count = 0} = this.props;
    const config = getFacetConfig(field);
    if (!field || !config) {
      return null;
    }
    const { icon, label } = config;
    return (
      <>
        <Icon icon={icon} className="left-icon"/>
        {label}
        {count}
      </>
    )
  }
}

class Facet {
  static Label = FacetLabel;  
}

export default Facet;