'use server';

import { ID } from 'node-appwrite';
import { createAdminClient, createSessionClient } from '../appwrite';
import { cookies } from 'next/headers';
import { parseStringify } from '../utils';

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    return parseStringify(response);
  } catch (error) {
    console.log(error);
  }
};
export const signUp = async (userData: SignUpParams) => {
  try {
    const { email, firstName, lastName, password } = userData;
    const { account } = await createAdminClient();
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    return null;
  }
};

// ... your initilization functions

export async function getLoggedInUser() {
  console.log('getLoggedInUser called');
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    console.log('Fetched user:', user);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    cookies().delete('appwrite-session');
    await account.deleteSession('current');
  } catch (error) {
    return null;
  }
};