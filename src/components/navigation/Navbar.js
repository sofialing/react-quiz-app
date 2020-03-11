import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { auth } from '../../modules/firebase'

const Navbar = props => {
	return (
		<nav className='navbar navbar-expand navbar-dark bg-dark fixed-top pt-0 pb-1'>
			<Link to='/' className='navbar-brand'>
				Quiz
			</Link>
			<ul className='navbar-nav ml-auto'>
				<li className='nav-item'>
					<NavLink to='/' className='nav-link'>
						All Quizzes
					</NavLink>
				</li>
				{props.user ? (
					<li className='nav-item'>
						<NavLink to='/add-quiz' className='nav-link'>
							Add Quiz
						</NavLink>
					</li>
				) : (
					''
				)}

				{props.user ? (
					<li className='nav-item'>
						<Link
							to='/'
							className='nav-link logout'
							onClick={() => auth.signOut()}>
							Logout
						</Link>
					</li>
				) : (
					<React.Fragment>
						<li className='nav-item'>
							<NavLink to='/login' className='nav-link'>
								Login
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink to='/sign-up' className='nav-link'>
								Sign up
							</NavLink>
						</li>
					</React.Fragment>
				)}
			</ul>
		</nav>
	)
}

export default Navbar
