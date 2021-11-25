import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { sidebarReducer } from './reducers/SidebarReducer'
import { userReducer} from './reducers/UserReducer'
import { categoryReducer} from './reducers/ForumReducer'
import {eventsReducer} from './reducers/events'
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

const persistedState = loadState();
const reducers = combineReducers({
    getActive: sidebarReducer,
    currentUser: userReducer,
    forumCategories: categoryReducer,
    events: eventsReducer
})

const Store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
)

export default Store;