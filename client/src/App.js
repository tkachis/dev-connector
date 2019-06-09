// System
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
// Components
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Routes from './components/routing/Routes'
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
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route component={Routes} />
					</Switch>
				</>
			</BrowserRouter>
		</Provider>
	)
}

export default App
