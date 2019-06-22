import * as admin from 'firebase-admin';

export const getLoggedInUser = async (loggedInUserId: string) => {
	if (!loggedInUserId) {
		return { id: null };
	}
	const ref = admin.database().ref(`members/${loggedInUserId}`);
	const data = await ref.once('value').then((snapshot: any) => snapshot.val());
	data.id = loggedInUserId;
	return data;
};

export const createUser = async (name: string, loggedInUserId: string) => {
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
