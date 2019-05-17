// System
import axios from 'axios'

// *
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
} from '../constants'
import { setAlert } from './alert'
import setAuthToken from '../helpers/setAuthToken'

// Load User
export const loadUser = () => async dispatch => {
	// add x-auth-token to request header
	setAuthToken(localStorage.token)

	try {
		const res = await axios.get('/api/auth')

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		})
	}
}

// Register User
export const register = user => async dispatch => {
	console.log(user)
	try {
		const res = await axios.post('api/users', user)
		console.log(axios.defaults.common)

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		})
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)))
		}

		dispatch({
			type: REGISTER_FAIL,
		})
	}
}
