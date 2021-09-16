import { createContext } from 'react';
export type ValueContextType = {
    value: string;
    setValue: (value: string) => void;
};

export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const initState = {
    avatar: '',
    cluster_admin: null,
    is_admin: 0,
    id: '',
    name: '',
    phone: '',
    sa_name: '',
    status: '',
    username: '',
};

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, ...action.user };
        case DELETE_USER:
            return initState;
        default:
            return state;
    }
};

export const UserContext = createContext<ValueContextType | any>({});
