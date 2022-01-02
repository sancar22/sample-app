export interface FormData {
  firstName: string;
  surname: string;
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