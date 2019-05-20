// System
import axios from 'axios'

// *
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
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
export const register = ({ name, email, password }) => async dispatch => {
	try {
		const res = await axios.post('api/users', { name, email, password })

		// Get token
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		})

		// Get user data
		dispatch(loadUser())
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

// Login User
export const login = ({ email, password }) => async dispatch => {
	try {
		const res = await axios.post('api/auth', { email, password })

		// Get token
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		})

		// Get user data
		dispatch(loadUser())
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)))
		}

		dispatch({
			type: LOGIN_FAIL,
		})
	}
}

// Logout / Clear Profile
export const logout = () => dispatch => {
	dispatch({ type: CLEAR_PROFILE })
	dispatch({ type: LOGOUT })
}
