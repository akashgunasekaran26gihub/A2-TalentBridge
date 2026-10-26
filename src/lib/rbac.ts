// Role-Based Access Control (RBAC) System for A2 TalentBridge
// Enforces security boundaries across Students, Companies, Universities, NGOs, and Platform Admins

export type UserRoleType = 'STUDENT' | 'COMPANY' | 'UNIVERSITY' | 'COMMUNITY' | 'ADMIN';

export const ROLES = {
  STUDENT: 'STUDENT',
  COMPANY: 'COMPANY',
  UNIVERSITY: 'UNIVERSITY',
  COMMUNITY: 'COMMUNITY',
  ADMIN: 'ADMIN',
} as const;

export interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  studentProfileId?: string;
  organizationId?: string;
}

/**
 * Checks whether the session user has at least one of the required roles.
 */
export function hasRequiredRole(userRoles: string[], allowedRoles: string[]): boolean {
  if (userRoles.includes(ROLES.ADMIN)) return true; // Admins have system-wide access
  return allowedRoles.some((role) => userRoles.includes(role));
}

/**
 * Validates that an organization resource belongs to the current user's organization.
 */
export function assertOrgOwnership(
  userOrgId: string | undefined,
  resourceOrgId: string,
  userRoles: string[]
): boolean {
  if (userRoles.includes(ROLES.ADMIN)) return true;
  if (!userOrgId) return false;
  return userOrgId === resourceOrgId;
}

/**
 * Validates that a student resource belongs to the requesting student.
 */
export function assertStudentOwnership(
  userStudentId: string | undefined,
  resourceStudentId: string,
  userRoles: string[]
): boolean {
  if (userRoles.includes(ROLES.ADMIN)) return true;
  if (!userStudentId) return false;
  return userStudentId === resourceStudentId;
}
