export interface IUser {
    name: string;
    email: string;
    role: 'admin' | 'user';
    password: string;
    phone: string;
    address: string;
}
