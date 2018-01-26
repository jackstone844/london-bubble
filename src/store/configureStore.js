/**
 * Configures the Redux store which is used to store the state of the app. 
 * The store dispatch()'s actions to reducers in order to update the state
 * The store uses thunk to dispatch functions rather than just plain objects
 */

import { 
    createStore, 
    applyMiddleware 
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/RootReducer.js';

/**
 * A reference to usful logger middleware that logs to the console whenever
 * an action is dispatched and as a result the state is updated
 * Logs: prev state, new state and updated state.
 */
const logger = createLogger();

/**
 * Export a function that creates the store
 * preloadedstate is undefined because we set the inital state in the reducers
 * Middleware is applied to the stor
 * @param {obj} preloadedState 
 */
export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunk,
            logger
        )
    );
}