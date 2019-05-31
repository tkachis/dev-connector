// System
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// Components
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
// *
import { getProfileByID } from '../../actions/profile'

const Profile = ({
	profile: { profile, loading },
	auth,
	match,
	getProfileByID,
}) => {
	useEffect(() => {
		getProfileByID(match.params.id)
	}, [getProfileByID, match.params.id])

	return (
		<>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<>
					<Link to="/profiles" className="btn btn-light">
						Back To Profiles
					</Link>

					{/* If my profile */}

					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to="/edit-profile" className="btn btn-dark">
								Edit Profile
							</Link>
						)}
					<div className="profile-grid my-1">
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
					</div>
				</>
			)}
		</>
	)
}

Profile.propTypes = {
	getProfileByID: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
})

export default connect(
	mapStateToProps,
	{ getProfileByID }
)(Profile)
