import React, { Component, PureComponent } from 'react';
import { Button, Icon, MenuItem, Popover, Spinner } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import truncateText from 'truncate';
import { connect } from 'react-redux';
import c from 'classnames';

import { fetchCollection } from 'actions';



import './Collection.scss'


class Collectionlabel extends PureComponent {
  getIcon(collection){
    return 'database';
  }
  render(){
    const {
      collection, icon = true, label = true, updating = false, truncate, className
    } = this.props;
    let text = collection.label;
    const renderedIcon = updating ? <Spinner size="16" /> : <Icon icon={this.getIcon(collection)} />;
    return(
      <span className={c('CollectionLabel', className)} title={collection.label}>
        {icon && renderedIcon}
        <span>{label && text}</span>
      </span>
    )
  
  }
}

class CollectionUpdateStatus extends PureComponent {  
  render(){

    const { collection, LabelComponent } = this.props;
    const updating = false;
    const collectionLabel = <LabelComponent updating={updating} {...this.props} />

    return(
      <Popover
        lazy
        interactionKind="hover"
        autofocus={false}
        popoverClassName="CollectionUpdateStatus__popover"
        target={collectionLabel}
        content={<div>Whdfa</div>}
      />
    )
  }
}

class Collection {
  static Label = Collectionlabel
  static Status = CollectionUpdateStatus;
}

export default Collection;