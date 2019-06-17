import * as admin from 'firebase-admin';

export const getLoggedInUser = async (loggedInUserId: string) => {
	console.info('hiooooo!!');
	console.info(loggedInUserId);
	if (!loggedInUserId) {
		return { id: null };
	}
	const ref = admin.database().ref(`members/${loggedInUserId}`);
	const data = await ref.once('value').then((snapshot: any) => snapshot.val());
	data.id = loggedInUserId;
	console.info(data);
	return data;
};

export const createUser = async (name: string, loggedInUserId: string) => {
	console.info('heyooooo!!!');
	console.info(name);
	console.info(loggedInUserId);
	if (!loggedInUserId) {
		return { uid: null };
	}
	const ref = admin.database().ref(`members/${loggedInUserId}`);
	await ref.set({
		uid: loggedInUserId,
		name,
	});

	const data = await ref.once('value').then((snapshot: any) => snapshot.val());
	return data;
};
