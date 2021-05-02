import { Intent, Position, Toaster } from '@blueprintjs/core'


const messages = {
  bad_request: {
    id: 'auth.bad_request',
    defaultMessage: 'The server did not accept your input'
  },
  unauthorized: {
    id: 'auth.unauthorized',
    defaultMessage: 'Not authorized'
  },
  server_error: {
    id: 'auth.server_error',
    defaultMessage: 'Server error'
  },
  unknown_error: {
    id: 'auth.unknown_error',
    defaultMessage: 'An unexpected error occured'
  },
  success: {
    id: 'auth.success',
    defaultMessage: 'Success'
  }
};


const statusMessages = {
  200: "Success",
  201: "Success",
  204: "Success",
  400: "Undefined",
  401: "Unauthorized",
  500: "Server Error"
}




export const toaster = Toaster.create({
  position: Position.TOP,
  className: 'bard-toaster'
})

const showToast = (userProps, intentProps) => {
  let userPropsConfig;
  if (typeof userProps === 'string') userPropsConfig = {message: userProps};
  else userPropsConfig = userProps;
  toaster.show({...intentProps, ...userPropsConfig});
}

export const showInfoToast = props => showToast(props, {
  intent: Intent.PRIMARY,
  icon: 'info-sign'
})

export const showSuccessToast = props => showToast(props, {
  intent: Intent.Success,
  icon: 'tick '
})

export const showWarningToast = props => showToast(props, {
  intent: Intent.WARNING,
  icon: 'warning-sign'
})

export const showErrorToast = props => showToast(props, {
  intent: Intent.DANGER,
  icon: 'error'
})



export const showResponseToast = (response) => {
  if (!response || !response.status) {
    return showWarningToast(messages.unknown_error)
  }
  const errorFunction = response.status > 499 ? showErrorToast : showWarningToast;
  const toastFunction = response.status > 399 ? errorFunction : showSuccessToast;
  if (response && response.data && response.data.message){
    return toastFunction(response.data.message);
  }
  const message = statusMessages[response.status] || messages.unknown_error;
  return toastFunction(message);
} 


