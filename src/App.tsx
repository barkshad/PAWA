import { useState } from 'react';
import SurveyForm from './components/SurveyForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

type ViewState = 'survey' | 'admin-login' | 'admin-dashboard';

export default function App() {
  const [view, setView] = useState<ViewState>('survey');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        {view === 'survey' && <SurveyForm />}
        {view === 'admin-login' && (
          <AdminLogin 
            onLogin={() => setView('admin-dashboard')} 
            onCancel={() => setView('survey')} 
          />
        )}
        {view === 'admin-dashboard' && (
          <AdminDashboard onLogout={() => setView('survey')} />
        )}
      </main>

      {/* Footer with Hidden Admin Link */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Progressive Action Welfare Alliance (PAWA). All rights reserved.</p>
          <div className="mt-2">
            {view === 'survey' && (
              <button 
                onClick={() => setView('admin-login')}
                className="opacity-20 hover:opacity-100 transition-opacity text-xs"
              >
                Admin Access
              </button>
            )}
            {view !== 'survey' && (
               <button 
               onClick={() => setView('survey')}
               className="text-[#002855] hover:underline text-xs"
             >
               Back to Survey
             </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
