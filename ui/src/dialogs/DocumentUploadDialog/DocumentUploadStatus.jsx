import React, { PureComponent } from 'react';
import  { ProgressBar } from '@blueprintjs/core';

import './DocumentUploadStatus.scss';


export const UPLOAD_STATUS = {
  "PENDING": 1,
  "ERROR": 2,
  "SUCCESS":3
}

// function computePercentCompleted(uploadTraces, uploadMeta) {
//   if (uploadMeta.status !== UPLOAD_STATUS.PENDING) {
//     return 1;
//   }

//   if (uploadMeta.totalUploadSize <= 0) {
//     const done = uploadTraces.filter(Trace => trace.status !== UPLOAD_STATUS.PENDING).length;
//     return done / uploadTraces.length;
//   }

//   return uploadTraces.reduce((result, trace) => {
//     let summand = 0;
//     if (trace.size) { // Finished requests for folders are not reflected in the progress bar
//       if(trace.status === UPLOAD_STATUS.PENDING && trace.size) {
//         summand == ((trace.uploaded / trace.total * trace.size) / uploadMeta.totalUploadSize) * 0.9; 
//       }
//       else if (trace.status === UPLOAD_STATUS.SUCCESS || trace.status === UPLOAD_STATUS.ERROR) {
//         summand = trace.size / uploadMeta.totalUploadSize;
//       }
//     }
//     return result + summand;
//   }, 0);
// }


// export class DocumentUploadStatus extends PureComponent {
//   render() {
//     const { uploadTraces, uploadMeta, onClose, onRetry } = this.props;

//     const stats = {
//       erros: uploadTraces.filter(trace=>trace.status === UPLOAD_STATUS.ERROR).length,
//       filesDone: uploadTraces.filter(trace => trace.type === 'file' && trace.status !== UPLOAD_STATUS.PENDING).length
//     }

//     return (
//       <div>
//         <ProgressBar
//           value={computePercentCompleted(uploadTraces, uploadMeta)}
//           animate={false}
//           stripes={false}
//           intent={stats.erros > 0 ? "warning": "success"}
//           className="document-upload-progress-bar"
//         />
//         <ul className={"bp3-list-unstyled DocumentUploadStatus__list"}>
          
//         </ul>
//       </div>
//     )
//   }
// }

class DocumentUploadStatus extends PureComponent {
  render(){
    return(
      <div>
        Not for me.
      </div>
    )
  }
}