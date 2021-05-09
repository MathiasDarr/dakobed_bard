import { join } from 'path';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Icon } from '@blueprintjs/core';

import getCollectionLink from 'util/getCollectionLink';

const messages = {
  diagrams: 'Diagrams',
  lists: 'Lists',
  documents: 'Documents'
}

const icons = {
  documents: 'document'
}


const CollectionViewIcon = ({ id, className }) => {
  const icon = icons[id];
  if (!icon) { return null };
  return <Icon icon={icon} className={className} />
}



class CollectionViewLabel extends PureComponent {
  render(){
    return(
      <div>COLLEVIION VIEW LABEL</div>
    )
  }
}


const CollectionViewLink = ({ id, collection, hash, search, children, ...rest }) => {
  const content = children || <CollectionViewLabel id={id} {...rest} />
  return (
    <Link to={getCollectionLink({ collection, mode: id, hash, search })}>
      {content}
    </Link>
  )
}
  // render(){
  //   const { icon, id } = this.props;
  //   const messageKey = messages.
  //   return(
  //     <>
  //       {icon && <CollectionViewIcon id={id} className="left-icon" />}
  //       <span>
  //         Collection View Label
  //       </span>
  //     </>
  //   )
  // }}


export default class CollectionView {
  static Icon = CollectionViewIcon;
  static Label = CollectionViewLabel;
  static Link = CollectionViewLink;
}