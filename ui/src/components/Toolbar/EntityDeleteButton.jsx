import React from 'react';
import { Button } from '@blueprintjs/core';
import { Count } from 'components/common';

import EntityDeleteDialog from 'dialogs/EntityDeleteDialog/EntityDeleteDialog';

const messages = {
  delete: 'Delete',
  remove: 'Remove'
}

class EntityDeleteButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
  }

  render() {
    const { deleteEntity, entities, actionType, redirectOnSuccess, showCount } = this.props;
    const { isOpen } = this.state;
    const buttonIcon = actionType === 'remove' ? 'delete': 'trash';
    const buttonText = messages[actionType]

    return (
      <>
        <Button icon={buttonIcon} onClick={() => this.toggle()} disabled={!entities.length} className="EntityActionBar__delete" >
          {buttonText}
        </Button>
        <EntityDeleteDialog
          entities={entities}
        />
      </>
    )
  }
}

export default EntityDeleteButton;