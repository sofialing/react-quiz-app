import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { auth } from './modules/firebase'
import Start from './components/pages/Start'
import Quiz from './components/pages/Quiz'
import AddNewQuiz from './components/pages/AddNewQuiz'
import Navbar from './components/navigation/Navbar'
import Login from './components/pages/user/Login'
import SignUp from './components/pages/user/Signup'
import PasswordReset from './components/pages/user/PasswordReset'
import NotFound from './components/pages/NotFound'

class App extends Component {
	state = {
		user: null
	}
	componentDidMount() {
		auth.onAuthStateChanged(authUser => {
			if (authUser) {
				this.setState({
					user: {
						email: authUser.email
					}
				})
			} else {
				this.setState({
					user: null
				})
			}
		})
	}

	render() {
		return (
			<BrowserRouter>
				<div id='App'>
					<Navbar user={this.state.user} />
					<div className='container my-5'>
						<Switch>
							<Route
								exact
								path='/'
								render={props => (
									<Start user={this.state.user} {...props} />
								)}
							/>
							<Route path='/quiz/:id' component={Quiz} />
							<Route
								path='/add-quiz'
								render={props => (
									<AddNewQuiz user={this.state.user} {...props} />
								)}
							/>
							<Route path='/login' component={Login} />
							<Route path='/sign-up' component={SignUp} />
							<Route path='/password-reset' component={PasswordReset} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		)
	}
}

export default App
