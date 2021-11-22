import * as actionTypes from '../constants/ForumConstants'
import api from '../../apis/api'

export const getForumCategories = () => async(dispatch) =>{
    dispatch({type: actionTypes.GET_CATEGORIES_REQUEST})
    let url = '/forum/category'
    api.get(url).then(res=>{
        dispatch({type: actionTypes.GET_CATEGORIES_SUCCESS, payload: res.data?.categories})
    }).catch(err => {
        dispatch({type: actionTypes.GET_CATEGORIES_FAIL})
    })
}
