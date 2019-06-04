// System
import axios from 'axios'
import { setAlert } from './alert'
// *
import {
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	DELETE_POST,
	ADD_POST,
} from '../constants'

// GET Posts
export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get('/api/posts')

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Add like
export const addLike = postId => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/like/${postId}`)

		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
		})
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Remove like
export const removeLike = postId => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/unlike/${postId}`)

		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
		})
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Delete post
export const deletePost = postId => async dispatch => {
	console.log(postId)
	try {
		await axios.delete(`/api/posts/${postId}`)

		dispatch({
			type: DELETE_POST,
			payload: postId,
		})

		dispatch(setAlert('Post Removed', 'success'))
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Add post
export const addPost = formData => async dispatch => {
	try {
		const res = await axios.post(`/api/posts/`, formData)

		dispatch({
			type: ADD_POST,
			payload: res.data,
		})

		dispatch(setAlert('Post Created', 'success'))
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}
