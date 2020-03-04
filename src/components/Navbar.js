import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light mb-3'>
			<Link to={'/'} className='navbar-brand'>
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
				<ul className='navbar-nav'>
					<li className='nav-item active'>
						<Link to={'/'} className='nav-link'>
							Home <span className='sr-only'>(current)</span>
						</Link>
					</li>
					<li className='nav-item'>
						<Link to={'/add'} className='nav-link'>
							Add quiz
						</Link>
					</li>

					<li className='nav-item'>
						<Link to={'/login'} className='nav-link'>
							Login
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
