import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { SurveyData } from '../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, LogOut, Loader2, FileText } from 'lucide-react';

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

  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 40, 85); // PAWA Blue
    doc.text('PAWA Consultation Report', 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Table
    const tableData = surveys.map(s => [
      s.name,
      s.phoneNumber,
      new Date(s.timestamp).toLocaleDateString(),
      s.consultationAnswer
    ]);

    autoTable(doc, {
      head: [['Name', 'Phone', 'Date', 'Response']],
      body: tableData,
      startY: 40,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [0, 40, 85], textColor: 255 }, // PAWA Blue
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 30 },
        2: { cellWidth: 25 },
        3: { cellWidth: 'auto' }
      }
    });

    doc.save('pawa-consultation-report.pdf');
  };

  const handleLogout = async () => {
    await api.logout();
    onLogout();
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col border-t-4 border-[#D62828]">
      <div className="bg-[#002855] p-6 text-white flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">PAWA Dashboard</h2>
          <p className="text-blue-200 text-sm">Manage and export survey data</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors text-sm border border-blue-700"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-[#002855] rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Total Responses</h3>
              <p className="text-2xl font-bold text-[#D62828]">{surveys.length}</p>
            </div>
          </div>
          
          <button
            onClick={generatePDF}
            disabled={surveys.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-[#D62828] hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Download className="w-5 h-5" /> Download PDF Report
          </button>
        </div>

        <div className="flex-1 border rounded-xl overflow-hidden bg-gray-50 relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#002855] animate-spin" />
            </div>
          ) : surveys.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <FileText className="w-12 h-12 mb-2 opacity-20" />
              <p>No responses yet</p>
            </div>
          ) : (
            <div className="overflow-auto h-full max-h-[500px]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Date</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Name</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Phone</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Response</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {surveys.map((survey) => (
                    <tr key={survey.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(survey.timestamp).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {survey.name}
                      </td>
                      <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                        {survey.phoneNumber}
                      </td>
                      <td className="p-4 text-sm text-gray-700 min-w-[300px]">
                        {survey.consultationAnswer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
