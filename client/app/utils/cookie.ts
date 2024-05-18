import type {Cookie} from '@shopify/remix-oxygen';
import {v4 as uuidv4} from 'uuid';

/**
 * This will match an cookie object against all cookies stored
 * If the cookie value already exists, it will not create a new one.
 * Otherwise, it will create a new uuidv4 number
 * @param cookieObject - cookie object
 * @param cookieHeader - cookies stored in the app
 * @returns - A string uuidv4 number
 */
export const readCookie = async (
  cookieObject: Cookie,
  cookieHeader: string | null,
) => {
  const cookie = await cookieObject.parse(cookieHeader);

  const identifier = !cookie ? `user-${uuidv4()}` : cookie;

  return identifier;
};
