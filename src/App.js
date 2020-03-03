import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Start from './components/Start'

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div id='App' className='container my-5'>
					<Switch>
						<Route exact path='/' component={Start} />
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export default App
