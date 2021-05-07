import React from 'react';
import { Dialog, Spinner} from '@blueprintjs/core';

import './FormDialog.scss';

const FormDialog = ({ processing, children, onSubmit, ...rest }) => {
  const onSubmitForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!processing) onSubmit();
  }
  return (
    <Dialog {...rest}>
      <div className="FormDialog__content">
        <form onSubmit={!!onSubmit ? onSubmitForm: undefined}>
          {children}
        </form>
      </div>
    </Dialog>
  )
  
}



// class FormDialog extends React.Component {
//   // const onSubmitForm = (event) => {
//   //   event.preventDefault();

//   // }

//   onSubmitForm


//   render(){
//     return(
//       <Dialog>
//         <div className="FormDialog__content">
//           <form onSubmit={!!onSubmit ? onSubmitForm : undefined}>

//           </form>
//         </div>


//       </Dialog> 



//     )
//   }
// }

export default FormDialog;