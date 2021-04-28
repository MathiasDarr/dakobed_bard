import { Intent, Position, Toaster } from '@blueprintjs/core'


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