export type OneItemOfObject<T, KeyT extends keyof T = keyof T> = { [key in KeyT]: T[KeyT] };
export type ValuesT<T> = T[keyof T];
