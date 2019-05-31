// System
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Components
import ProfileItem from './ProfileItem'
// *
import Spiner from '../layout/Spinner'
import { getAllProfiles } from '../../actions/profile'

const Profiles = ({ profile: { profiles, loading }, getAllProfiles }) => {
	useEffect(() => {
		getAllProfiles()
	}, [getAllProfiles])

	return (
		<>
			{loading ? (
				<Spiner />
			) : (
				<>
					<h1 className="large text-primary">Developers</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop" /> Browse and connect with
						developers
					</p>
					<div className="profiles">
						{profiles.length ? (
							profiles.map(profile => (
								<ProfileItem key={profile._id} profile={profile} />
							))
						) : (
							<h4>No profiles found...</h4>
						)}
					</div>
				</>
			)}
		</>
	)
}

Profiles.propTypes = {
	getAllProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	profile: state.profile,
})

export default connect(
	mapStateToProps,
	{ getAllProfiles }
)(Profiles)
