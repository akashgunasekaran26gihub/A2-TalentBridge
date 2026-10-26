import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Record audit log before deletion
    await prisma.auditLog.create({
      data: {
        userId: null,
        action: 'GDPR_ACCOUNT_DELETED',
        resourceType: 'USER',
        resourceId: session.id,
        details: JSON.stringify({ email: session.email }),
      },
    });

    // Cascade delete user account
    await prisma.user.delete({
      where: { id: session.id },
    });

    const response = NextResponse.json({
      message: 'Your account and personal data have been permanently erased under GDPR Article 17.',
    });

    // Expire session cookie
    response.cookies.set('a2_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    console.error('GDPR deletion error:', error);
    return NextResponse.json({ error: 'Failed to process account deletion' }, { status: 500 });
  }
}
