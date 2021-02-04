export interface ISignInPayload {
  email: string,
  password: string
}

export interface ISignUpPayload {
  userName: string,
  fullName: string,
  email: string,
  password: string,
  password2: string
}