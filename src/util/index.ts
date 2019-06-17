import * as firebase from 'firebase';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { loggedInUserQueryLocal } from '../graphql/local';
let firebaseConfig = {};
try {
	firebaseConfig = require('../firebase-config.json');
} catch (e) {
	throw new Error(
		'Add your firebase config from project settings to src/firebase-config.json and make sure you make it properly formatted JSON!'
	);
}

firebase.initializeApp(firebaseConfig);

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: process.env.REACT_APP_FIREBASE_URL,
});

export const auth = firebase.auth();

export const writeLoggedInUser = (uid: string | null, token: string | null) => {
	client.writeQuery({
		query: loggedInUserQueryLocal,
		data: {
			loggedInUserLocal: {
				uid: uid,
				token,
				__typename: 'loggedInUserLocal',
			},
		},
	});
};
export const getLoggedInUser = () => {
	let loggedInUser = { token: null, uid: null };
	try {
		const { loggedInUserLocal }: any = client.readQuery({
			query: loggedInUserQueryLocal,
		});
		loggedInUser = loggedInUserLocal;
	} catch (e) {}
	return loggedInUser;
};
