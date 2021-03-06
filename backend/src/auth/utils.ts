import { decode } from 'jsonwebtoken'

import { JwtPayload } from './JwtPayload'

/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken: string): string {
  console.log("before: deccoded jwt token: " + jwtToken)
  const decodedJwt = decode(jwtToken) as JwtPayload
  console.log("deccoded jwt token: " + decodedJwt.sub)
  return decodedJwt.sub
}
