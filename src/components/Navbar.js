import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../modules/firebase';

const Navbar = props => {
	const handleSignOut = e => {
		auth.signOut().then(() => {
			//skicka vidare till start eller login
			console.log(props.user.email, 'signed out');
		});
	};

	return (
		<nav className='navbar navbar-expand navbar-light bg-light mb-3'>
			<Link to='/' className='navbar-brand'>
				Quiz
			</Link>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarNav'
				aria-controls='navbarNav'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon'></span>
			</button>
			<div className='collapse navbar-collapse' id='navbarNav'>
				<ul className='navbar-nav ml-auto'>
					<li className='nav-item'>
						<NavLink to='/' className='nav-link'>
							All Quizzes
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to='/addQuiz' className='nav-link'>
							Add Quiz
						</NavLink>
					</li>
					{props.user ? (
						<li className='nav-item'>
							<span
								className='nav-link logout'
								onClick={handleSignOut}
							>
								Logout
							</span>
						</li>
					) : (
						<li className='nav-item'>
							<NavLink to='/login' className='nav-link'>
								Login
							</NavLink>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
