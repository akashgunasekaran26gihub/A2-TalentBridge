// Authentication, Password Hashing & JWT Session Management for A2 TalentBridge

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { SessionUser } from './rbac';

const JWT_SECRET = process.env.JWT_SECRET || 'a2_talentbridge_super_secret_jwt_key_riga_2026_dev_min_32_chars';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Hash plaintext password using bcrypt with 10 salt rounds.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify plaintext password against stored hash.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Sign JWT session token containing user identity and role metadata.
 */
export function signSessionToken(payload: SessionUser): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
}

/**
 * Verify and decode a JWT session token.
 */
export function verifySessionToken(token: string): SessionUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as SessionUser;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Extract session user from NextRequest headers or cookies.
 */
export function getSessionFromRequest(req: NextRequest): SessionUser | null {
  // 1. Check Bearer Authorization header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const session = verifySessionToken(token);
    if (session) return session;
  }

  // 2. Check HTTP-only cookie 'a2_session'
  const cookieToken = req.cookies.get('a2_session')?.value;
  if (cookieToken) {
    const session = verifySessionToken(cookieToken);
    if (session) return session;
  }

  return null;
}
