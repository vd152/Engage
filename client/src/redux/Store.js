import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { sidebarReducer } from './reducers/SidebarReducer'

const reducers = combineReducers({
    getActive: sidebarReducer
})

const Store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
)

export default Store;