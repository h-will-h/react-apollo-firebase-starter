import React, { Component, BaseSyntheticEvent } from 'react';
import { History } from 'history';
import { auth, client } from '../util';
import { createUserMutation } from '../graphql/member';

interface Props {
	history: History;
}

interface State {
	name: string;
	email: string;
	password: string;
	error: Error | null;
}

class Signup extends Component<Props, State> {
	state = {
		name: '',
		email: '',
		password: '',
		error: null,
	};
	handleSubmit = (e: BaseSyntheticEvent) => {
		const { name, email, password } = this.state;
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(async (data: any) => {
				const token = await data.user.getIdToken(true);
				client
					.mutate({
						mutation: createUserMutation,
						variables: {
							name,
						},
						context: {
							headers: {
								token,
							},
						},
					})
					.then(() => {
						this.props.history.push(`/`);
					});
			})
			.catch((error: any) => {
				this.setState({ error });
			});
	};
	handleKeyUp = (e: BaseSyntheticEvent) => {
		const { name, value } = e.target;
		//@ts-ignore
		this.setState({
			[name]: value,
		});
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Sign Up</h1>
				<fieldset>
					<p>
						<label>Name</label>
					</p>
					<input type="text" name="name" onChange={this.handleKeyUp} />
				</fieldset>
				<fieldset>
					<p>
						<label>Email</label>
					</p>
					<input type="email" name="email" onChange={this.handleKeyUp} />
				</fieldset>
				<fieldset>
					<p>
						<label>Password</label>
					</p>
					<input type="password" name="password" onChange={this.handleKeyUp} />
					<p>
						<input type="submit" value="Sign Up" />
					</p>
				</fieldset>
			</form>
		);
	}
}

export default Signup;
