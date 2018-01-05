import { 
    createStore, 
    applyMiddleware 
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/RootReducer.js';

const logger = createLogger();

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