import Sidebar from '../_components/Sidebar';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Column */}
      <Sidebar />
      
      {/* Main Content Column */}
      <main className="flex-1 bg-slate-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}