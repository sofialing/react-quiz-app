import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Start from './components/Start'
import Result from './components/Result'
import Quiz from './components/Quiz'
import AddQuestion from './components/AddQuestion'

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div id='App' className='container my-5'>
					<Switch>
						<Route exact path='/' component={Start} />
						<Route path='/quiz/:id' component={Quiz} />
						<Route path='/add' component={AddQuestion} />
						<Route path='/result' component={Result} />
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export default App
