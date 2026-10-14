// Hard-coded admin credentials for Arslan Traders
// In production, replace with proper auth (NextAuth, database, etc.)

export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'arslan2025';

// Hard-coded session token (signed value)
export const ADMIN_SESSION_COOKIE = 'arslan_admin_session';
export const ADMIN_TOKEN = 'at_admin_' + Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString('base64');
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function isValidCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function isValidSession(token: string | undefined): boolean {
  if (!token) return false;
  return token === ADMIN_TOKEN;
}
