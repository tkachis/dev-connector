// System
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// Components
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
// *
import { getCurrentProfile, deleteAccount } from '../../actions/profile'

const Dashboard = ({
	profile: { profile, loading },
	auth: { user },
	getCurrentProfile,
	deleteAccount,
}) => {
	useEffect(() => {
		getCurrentProfile()
	}, [getCurrentProfile])

	return loading && profile === null ? (
		<Spinner />
	) : (
		<>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<>
					<DashboardActions />
					{profile.experience.length > 0 && (
						<Experience experience={profile.experience} />
					)}
					{profile.education.length > 0 && (
						<Education education={profile.education} />
					)}

					<div className="my-2">
						<button className="btn btn-danger" onClick={() => deleteAccount()}>
							<i className="fas fa-user" /> Delete My Account
						</button>
					</div>
				</>
			) : (
				<>
					<p>You have not yet setup a profile, please add some info</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Create Profile
					</Link>
				</>
			)}
		</>
	)
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
})
export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard)
