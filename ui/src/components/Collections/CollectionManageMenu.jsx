import React from 'react';
import { Button, Popover, Menu, Intent } from '@blueprintjs/core';

import CollectionDeleteDialog from 'dialogs/CollectionDeleteDialog/CollectionDeleteDialog';


const messages = {
  access: 'Share',
  edit: 'Settings',
  delete_collection: 'Delete collection', 
}

class CollectionManageMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.toggleDialog = this.toggleDiaglog.bind(this);
  }

  toggleDiaglog(name){
    const isOpen = this.state[name];
    this.setState({ [name]: !!!isOpen });
  }

  render(){
    const { collection } = this.props;
    
    return(
      <>
        <Popover>
          <Button icon="cog" rightIcon="caret-down" />
          <Menu>
            <Menu.Item
              key={"edit"}
              onCLick={() => this.toggleDiaglog('isEditOpen')}
              text={messages.edit}
              icon="cog"
            />
          </Menu>
        </Popover>
        <CollectionDeleteDialog
          isOpen={!!this.state.isDeleteOpen}
          toggleDiaglog={() => this.toggleDiaglog('isDeleteOpen')}
          collection={collection}
        />
      </>
    )    
  }

}

export default CollectionManageMenu;