// System
import axios from 'axios'

// *
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../constants'
import { setAlert } from './alert'

// Register User
export const register = user => async dispatch => {
	console.log(user)
	try {
		const res = await axios.post('api/users', user)
		console.log(res.data)

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
