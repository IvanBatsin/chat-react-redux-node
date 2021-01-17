export interface IUser {
  _id?: string,
  fullName: string,
  userName: string,
  email: string
  avatarUrl?: string,
  createdAt?: string,
  updatedAt?: string,
  last_seen?: string
  confirmed?: boolean
}