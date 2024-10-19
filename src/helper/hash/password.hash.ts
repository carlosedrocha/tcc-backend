import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

// Function to to compare encrypted password with plain text password
export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
