export interface IUser {
  _id: string,
  fullName: string,
  userName: string,
  email: string
  avatarUrl: string,
  createdAt: string,
  password?: string,
  online: boolean
}