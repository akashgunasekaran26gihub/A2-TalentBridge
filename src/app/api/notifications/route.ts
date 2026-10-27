import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let notifications: any[] = [];
    try {
      notifications = await prisma.notification.findMany({
        where: { userId: session.id },
        orderBy: { createdAt: 'desc' },
        take: 20,
      });
    } catch (dbErr) {
      console.warn('Notifications db query failed, returning empty list:', dbErr);
    }

    return NextResponse.json({ notifications });
  } catch (error: any) {
    console.error('Fetch notifications error:', error);
    return NextResponse.json({ notifications: [] });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { notificationId } = body;

    if (notificationId) {
      await prisma.notification.updateMany({
        where: { id: notificationId, userId: session.id },
        data: { isRead: true },
      });
    } else {
      // Mark all read
      await prisma.notification.updateMany({
        where: { userId: session.id },
        data: { isRead: true },
      });
    }

    return NextResponse.json({ message: 'Notifications updated' });
  } catch (error: any) {
    console.error('Update notifications error:', error);
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
  }
}
