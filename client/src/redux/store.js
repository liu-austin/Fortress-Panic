// jshint esversion:6
import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import resetReducer from './root-reducer';
import { persistStore } from 'redux-persist';

const middlewares = [];

// If in development environment use logger middleware,
// but not in production environment
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}


export const store = createStore(resetReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
export default { store, persistor };
