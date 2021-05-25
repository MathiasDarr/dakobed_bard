import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import collectionViewIds from 'components/Collections/collectionViewIds';
import { Skeleton } from 'components/common';

import DocumentUploadDialog from 'dialogs/DocumentUploadDialog/DocumentUploadDialog';

import './TripReportQuickLinks.scss';
import { DialogToggleButton } from 'components/Toolbar';


const messages = {
  upload: "Upload documents"
}


class TripReportQuickLinks extends React.Component {
  onDocUpload = () => {
    const { history, location } = this.props;
    history.push({
      pathname: location.pathname,
      hash: queryString.stringify({mode: collectionViewIds.DOCUMENTS })
    });
  }

  renderSkeleton() {
    return (
      <div className="TripReportQuickLinks">
        {[...Array(1).keys()].map(key => (
          <div className="TripReportQuickLinks__item" key={key}>
            <Skeleton.Text type="div" length="250" className="TripReportQUickLinks__item__content" />
          </div>
        ))}
      </div>
    )
  }

  render(){
    console.log("KATHLEEN I AM SORRY")
    const { collection, model } = this.props;
    console.log("THE COLLECTION LOOKS LIKE ", collection)
    if (collection.id === undefined) {
      return this.renderSkeleton();
    }

    return(
      <div>
        WHY
        {/* <div>
            QUICK LINKS WHGY
        </div>
        <div className="TripReportQuickLinks">
          <DialogToggleButton
            buttonProps={{
              minimal:true,
              className: "TripReportQuickLinks__item__content"
            }}
            Dialog={DocumentUploadDialog}
            dialogProps={{ collection, onUploadSuccess: this.onDocuUpload }}
          >
            <>
            HNELLO
              <div className="TripReportQuickLinks__item__image" style={{ backgroundImage:`url(/static/trip_report_upload.svg)` }}/>
              <div className="TripReportQuickLinks__item__text">
                Upload Documents 
                <p>{messages.upload}</p>
              </div>
            </>
          </DialogToggleButton>
        </div>

        <div className="TripReportQuiciLiniks__item__content">
            <DialogToggleButton
              buttonProps={{
                minimal:true,
                className:"TripReportQuickLinks__item__content"
              }}
              
            >

            </DialogToggleButton>
        </div> */}
      </div>

      //   DKJATATDGDAFADWF
      //   <div className="TripReportQuickLiniks__item">
          // {/* <DialogToggleButton
          //   buttonProps={{
          //     minimal:true,
          //     className="TripReportQuickLinks__item__content"
          //   }}
          //   Dialog={DocumentUploadDialog}
          //   dialogProps={{ collection, onUploadSuccess: this.onDocuUpload }}
          // >
          //   <>
          //     <div className="TripReportQuickLinks__item__image" style={{ backgroundImage:`url(/static/trip_report_upload.svg)` }}/>
          //     <div className="TripReportQuickLinks__item__text">
          //       <p>{messages.upload}</p>
          //     </div>
          //   </>
          // </DialogToggleButton> */}
      //   </div>

        
      // </div>
    )
  }
}

export default compose(
  withRouter
)(TripReportQuickLinks);