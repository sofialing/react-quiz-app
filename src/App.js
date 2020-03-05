import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Start from './components/Start'
import Result from './components/Result'
import Quiz from './components/Quiz'
import AddNewQuiz from './components/AddNewQuiz'

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div id='App' className='container my-5'>
					<Switch>
						<Route exact path='/' component={Start} />
						<Route path='/quiz/:id' component={Quiz} />
						<Route path='/result' component={Result} />
						<Route path='/addQuiz' component={AddNewQuiz} />
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export default App
