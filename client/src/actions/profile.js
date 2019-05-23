import axios from 'axios'
import { setAlert } from './alert'

import { GET_PROFILE, PROFILE_ERROR } from '../constants'

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me')

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Create or update profile
export const createProfile = (
	formData,
	history,
	edit = false
) => async dispatch => {
	try {
		const res = await axios.post('/api/profile', formData)

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		})

		dispatch(
			setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success', 5000)
		)

		// Redirect on rout /dashboard
		if (!edit) {
			history.push('/dashboard')
		}
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}
