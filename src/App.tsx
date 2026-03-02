import { useState } from 'react';
import SurveyForm from './components/SurveyForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

type ViewState = 'survey' | 'admin-login' | 'admin-dashboard';

export default function App() {
  const [view, setView] = useState<ViewState>('survey');

  return (
    <>
      {view === 'survey' && (
        <SurveyForm onAdminAccess={() => setView('admin-login')} />
      )}
      {view === 'admin-login' && (
        <AdminLogin 
          onLogin={() => setView('admin-dashboard')} 
          onCancel={() => setView('survey')} 
        />
      )}
      {view === 'admin-dashboard' && (
        <AdminDashboard onLogout={() => setView('survey')} />
      )}
    </>
  );
}
