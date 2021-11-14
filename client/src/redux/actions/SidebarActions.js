import * as actionTypes from '../constants/SidebarConstants'

export const setActive = (value) => async(dispatch) =>  {
    dispatch({type: actionTypes.SET_ACTIVE, payload: value});
}
