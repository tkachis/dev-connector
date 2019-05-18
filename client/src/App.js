// System
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
// Components
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
// *
import store from './store'
import setAuthToken from './helpers/setAuthToken'
import { loadUser } from './actions/auth'

// Styles
import './App.css'

setAuthToken(localStorage.token)

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])

	return (
		<Provider store={store}>
			<BrowserRouter>
				<>
					<Navbar />
					<Route exact path="/" component={Landing} />
					<section className="container">
						<Alert />
						<Switch>
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>
					</section>
				</>
			</BrowserRouter>
		</Provider>
	)
}

export default App
