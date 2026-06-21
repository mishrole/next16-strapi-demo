import { loginUserAction, logoutUserAction, registerUserAction } from "./auth"

export const actions = {
  auth: {
    registerUserAction,
    logoutUserAction,
    loginUserAction,
  },
}
