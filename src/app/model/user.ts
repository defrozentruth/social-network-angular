export interface User {
    email: string,
    password: string
}

export interface RegisterData extends User{
    name: string,
}
