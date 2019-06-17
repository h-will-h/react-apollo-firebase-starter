import * as admin from "firebase-admin";

export const getLoggedInUser = async (loggedInUserId: string) => {
  const ref = admin.database().ref(`members/${loggedInUserId}`);
  const data = await ref.once("value").then((snapshot: any) => snapshot.val());
  return data;
};
