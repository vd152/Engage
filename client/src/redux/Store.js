import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { sidebarReducer } from './reducers/SidebarReducer'
import { userReducer} from './reducers/UserReducer'
import { categoryReducer} from './reducers/ForumReducer'

const reducers = combineReducers({
    getActive: sidebarReducer,
    currentUser: userReducer,
    forumCategories: categoryReducer
})

const Store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
)

export default Store;