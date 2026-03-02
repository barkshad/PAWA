import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { SurveyData } from '../types';
import { generateConsultationReport } from '../utils/pdfGenerator';
import { Download, LogOut, Loader2, FileText, Users, Calendar } from 'lucide-react';
import { Layout } from './Layout';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await api.getSurveys();
      setSurveys(data);
    } catch (error) {
      console.error('Failed to load surveys', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.logout();
    onLogout();
  };

  return (
    <Layout maxWidth="xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500">Overview of consultation responses</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
            <Button
              onClick={() => generateConsultationReport(surveys)}
              disabled={surveys.length === 0}
            >
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-pawa-blue">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Responses</p>
              <p className="text-2xl font-bold text-slate-900">{surveys.length}</p>
            </div>
          </Card>
          {/* Add more stats if needed, placeholders for now to balance grid */}
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg text-green-700">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Participants</p>
              <p className="text-2xl font-bold text-slate-900">{surveys.length}</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg text-purple-700">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Last Update</p>
              <p className="text-sm font-bold text-slate-900">
                {surveys.length > 0 ? new Date(surveys[0].timestamp).toLocaleDateString() : '-'}
              </p>
            </div>
          </Card>
        </div>

        {/* Data Table */}
        <Card noPadding className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium text-slate-500">Date</th>
                  <th className="px-6 py-3 font-medium text-slate-500">Name</th>
                  <th className="px-6 py-3 font-medium text-slate-500">Phone</th>
                  <th className="px-6 py-3 font-medium text-slate-500">Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-pawa-blue" />
                      <p className="mt-2 text-slate-500">Loading data...</p>
                    </td>
                  </tr>
                ) : surveys.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      No responses found.
                    </td>
                  </tr>
                ) : (
                  surveys.map((survey) => (
                    <tr key={survey.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                        {new Date(survey.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                        {survey.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                        {survey.phoneNumber}
                      </td>
                      <td className="px-6 py-4 text-slate-700 min-w-[300px]">
                        {survey.consultationAnswer}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
