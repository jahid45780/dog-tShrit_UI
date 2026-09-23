

export interface ILogin {
    email: string;
    password: string;
}

export interface IUpdateProfilePayload {
  name?: string;
  address?: string;
  phone?: string;
}