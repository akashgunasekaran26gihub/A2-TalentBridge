// Timezone utilities pinned to Europe/Riga for A2 TalentBridge
// Storage is always in UTC; business logic & display strictly respects Europe/Riga

export const LATVIA_TIMEZONE = process.env.APP_TIMEZONE || 'Europe/Riga';
export const LATVIA_LOCALE = 'en-GB';
export const LATVIA_CURRENCY = 'EUR';

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Format a UTC Date or ISO string into a human-readable Riga business date/time string.
 */
export function formatRigaDateTime(date: Date | string | null | undefined): string {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return 'Invalid date';

  const day = d.getUTCDate();
  const month = MONTHS_SHORT[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  const hours = String(d.getUTCHours()).padStart(2, '0');
  const minutes = String(d.getUTCMinutes()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes} EET`;
}

/**
 * Format a UTC Date into a Riga date only string (e.g. "25 Oct 2026")
 */
export function formatRigaDate(date: Date | string | null | undefined): string {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return 'Invalid date';

  const day = d.getUTCDate();
  const month = MONTHS_SHORT[d.getUTCMonth()];
  const year = d.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Check if a deadline in Riga time has passed.
 */
export function isRigaDeadlinePassed(deadline: Date | string): boolean {
  const d = typeof deadline === 'string' ? new Date(deadline) : deadline;
  return new Date().getTime() > d.getTime();
}

/**
 * Format currency amounts in EUR.
 */
export function formatEur(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || amount === 0) return 'Unpaid / Voluntary';
  return `€${amount.toLocaleString('en-US')}/mo`;
}

