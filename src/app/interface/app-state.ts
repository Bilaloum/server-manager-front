import { DataState } from "../enumeration/data-state.enum";

export interface AppState<T> {
    dataState: DataState,
    data?: T,
    error?: string,
}