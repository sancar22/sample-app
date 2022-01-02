export interface FormDataRegister {
  firstName: string;
  surname: string;
  username: string;
  password: string;
}

export interface FormDataLogin {
  username: string;
  password: string;
}

export interface ToastParams {
  title: string;
  body?: string;
  image?: string;
  textStyle?: object;
  audioSrc?: string;
}

export interface IUser {
  id: number;
  firstName: string;
  surname: string;
  username: string;
}