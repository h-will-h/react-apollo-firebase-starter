import React, { BaseSyntheticEvent } from 'react';
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
								<h1>Hi</h1>
								{id ? (
									<div>
										<p>
											Great, you're logged in <b>{name}</b>!
										</p>
										<p>
											<a href="#" onClick={handleLogout}>
												Log out
											</a>
										</p>
									</div>
								) : (
									<div>
										Hmm&hellip we couldn't find your account. Log in or Sign up
									</div>
								)}
							</>
						);
					}}
				</Query>
			) : (
				<>
					<h1>You aren't signed in</h1>
					<div>Log in or Sign up</div>
				</>
			)}
		</>
	);
};

export default Home;
