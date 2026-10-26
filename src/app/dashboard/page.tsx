import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';

export default function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('a2_session')?.value;
  const user = token ? verifySessionToken(token) : null;

  if (user) {
    if (user.roles?.includes('ADMIN') || user.roles?.includes('PLATFORM_ADMIN')) {
      redirect('/dashboard/admin');
    } else if (user.roles?.includes('COMPANY') || user.roles?.includes('COMPANY_ADMIN')) {
      redirect('/dashboard/company');
    } else if (user.roles?.includes('UNIVERSITY') || user.roles?.includes('UNIVERSITY_ADMIN')) {
      redirect('/dashboard/university');
    }
  }

  redirect('/dashboard/student');
}
