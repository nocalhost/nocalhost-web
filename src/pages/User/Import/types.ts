import { ReactComponent } from '*.svg';

export type ImportStateType<T = any> = {
    file?: File;
    result: Array<T>;
    taskId?: string;
};
export type ImportContextType<T> = {
    state: ImportStateType<T>;
    setState: (state: ImportStateType<T>) => void;
    config: {
        template: {
            name: string;
            link: string;
            accept: string;
            suffix: string[];
        };
        icon: {
            default: typeof ReactComponent;
            select: typeof ReactComponent;
        };
        complete: {
            link: string;
            text: string;
        };
    };
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function EmptyFunction() {}
