import * as actionTypes from '../constants/UserConstants'
import api from '../../apis/api'

export const currentUser = (id) => async(dispatch) =>{
    dispatch({type: actionTypes.USER_REQUEST})
    let url = '/user/'+ id
    api.get(url).then(res=>{
        dispatch({type: actionTypes.USER_SUCCESS, payload: res.data?.user})
    }).catch(err => {
        console.log(err)
        dispatch({type: actionTypes.USER_FAIL})
    })
}
