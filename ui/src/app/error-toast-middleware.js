import { get } from 'lodash'

import * as actions from 'actions'
import { showWarningToast } from './toast'

const errorActionTypes = [
  actions.fetchMetadata.ERROR,
  actions.fetchStatistics.ERROR,
]

const errorToastMiddleware= () => next => (action) => {
  const newState = next(action);

  if(errorActionTypes.includes(action.type)){
    const defaultDescription = 'He\'s dead Jim.';
    const statusCode = get(action, 'payload.error.response.status');
    if (statusCode !== 403 && statusCode !== 401){
      const description = get(action, 'payload.error.response.status')
      showWarningToast(description)
    }
  }
  return newState;

}

export default errorToastMiddleware;