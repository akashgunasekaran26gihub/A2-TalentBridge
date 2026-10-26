import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--soft-canvas)',
        color: 'var(--nordic-slate)',
      }}
    >
      {/* Modern SaaS Navigation Rail */}
      <DashboardSidebar />

      {/* Main App Workspace Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <DashboardHeader />
        <main
          style={{
            flex: 1,
            padding: '2rem 2.5rem',
            overflowY: 'auto',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
