import configureStore  from "./config";

/**
 * Create the store & export it
 */
export const store = configureStore();
/**
 * export Dispatch
 */
export const dispatch = store.dispatch;