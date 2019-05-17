// System
import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

// Components
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'

// *
import store from './store'

// Styles
import './App.css'

const App = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Fragment>
				<Navbar />
				<Route exact path="/" component={Landing} />
				<section className="container">
					<Alert />
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
					</Switch>
				</section>
			</Fragment>
		</BrowserRouter>
	</Provider>
)

export default App
