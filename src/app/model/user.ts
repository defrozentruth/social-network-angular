export interface User {
    email: string,
    password: string
}

export interface RegisterData extends User{
    name: string,
}

export interface CompleteUser {
  date: Date,
  email: string,
  friends: number[],
  id: number,
  name: string,
  role: string,
  status: string
}
