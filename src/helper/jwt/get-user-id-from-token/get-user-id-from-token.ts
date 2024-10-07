import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export function getUserIdFromToken(token: string): string | null {
  try {
    // Verify the token and decode it
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Check if the decoded token contains the 'sub' property (commonly used for user ID)
    if (decoded && decoded.sub) {
      return decoded.sub; // Return the user ID
    }

    return null; // Return null if the user ID is not present
  } catch (error) {
    console.error('Error verifying/decoding token:', error);
    return null; // Return null in case of an error
  }
}
