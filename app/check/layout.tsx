import Sidebar from '../_components/Sidebar';

interface CheckLayoutProps {
  children: React.ReactNode;
}

export default function CheckLayout({ children }: CheckLayoutProps) {
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