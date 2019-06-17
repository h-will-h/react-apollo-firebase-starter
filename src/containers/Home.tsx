import React, { BaseSyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { getLoggedInUser, auth } from '../util';
import { getLoggedInUserQuery } from '../graphql/member';
import logo from '../logo.svg';

interface Props {}

const handleLogout = (e: BaseSyntheticEvent) => {
	e.preventDefault();
	auth.signOut();
};

const Home = (props: Props) => {
	const { token } = getLoggedInUser();
	return (
		<>
			{token ? (
				<Query
					query={getLoggedInUserQuery}
					context={{
						headers: {
							token,
						},
					}}
				>
					{({ loading, error, data }: any) => {
						if (loading) {
							return <img src={logo} className="App-logo" alt="logo" />;
						}
						if (error) {
							return (
								<div className="error">
									Something went wrong: {error.message}
								</div>
							);
						}
						const { id, name } = data.loggedInUser;
						return (
							<>
								<h1>Hi {name}</h1>
								{id ? (
									<div>
										<p>Great, you're logged in.</p>
										<p>
											<a href="#" onClick={handleLogout}>
												Log out
											</a>
										</p>
									</div>
								) : (
									<div>
										Hmm&hellip; we couldn't find your account.{' '}
										<Link to="/login">Log in</Link> or{' '}
										<Link to="/signup">Sign up</Link>.
									</div>
								)}
							</>
						);
					}}
				</Query>
			) : (
				<>
					<h1>Welcome</h1>
					<div>
						<Link to="/login">Log in</Link> or <Link to="/signup">Sign up</Link>
						.
					</div>
				</>
			)}
		</>
	);
};

export default Home;
