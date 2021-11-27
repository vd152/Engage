import * as actionTypes from '../constants/UserConstants';

export const userReducer = (state={loading: false , user:{isAdmin: false}}, action) => {
    switch(action.type) {
            case actionTypes.USER_REQUEST:
                return {
                    loading: true,
                    user: {}
            }
            case actionTypes.USER_SUCCESS:
                return {
                    loading: false,
                    user: action.payload
                }
            case actionTypes.USER_FAIL:
                return {
                    loading: false,
                    user: state.user
                }
            default:
                return state;
    }
}