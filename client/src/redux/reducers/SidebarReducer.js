import * as actionTypes from '../constants/SidebarConstants';

export const sidebarReducer = (state={active: "Home"}, action) => {
    switch(action.type) {
            case actionTypes.SET_ACTIVE:
                return {
                    active : action.payload
            }
            default:
                return state;
    }
}