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

export interface IMessage {
    id: number;
    ownerId: number;
    text: string;
    createdAt: string;
    User: {
        firstName: string;
        surname: string;
        username: string;
    };
}

export interface MessageProps {
    isUser: boolean;
    content: string;
    date: string;
    fullName: string;
    username: string;
    key: number
}
