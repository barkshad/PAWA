import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SurveyData } from '../types';

export const generateConsultationReport = (surveys: SurveyData[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // --- Header ---
  // PAWA Blue Background
  doc.setFillColor(0, 40, 85);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Title (White)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('PAWA Consultation Report', 14, 20);

  // Subtitle / Date (Light Blue)
  doc.setTextColor(200, 220, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
  doc.text(`Total Responses: ${surveys.length}`, 14, 35);

  // --- Footer Helper ---
  const addFooter = (data: any) => {
    const pageCount = doc.getNumberOfPages();
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${data.pageNumber}`,
      pageWidth - 20,
      doc.internal.pageSize.height - 10,
      { align: 'right' }
    );
    doc.text(
      'Progressive Action Welfare Alliance',
      14,
      doc.internal.pageSize.height - 10
    );
  };

  // --- Table ---
  const tableData = surveys.map(s => [
    new Date(s.timestamp).toLocaleDateString(),
    s.name,
    s.phoneNumber,
    s.consultationAnswer
  ]);

  autoTable(doc, {
    head: [['Date', 'Name', 'Phone', 'Response']],
    body: tableData,
    startY: 50,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 4,
      textColor: [30, 41, 59], // Slate 800
      lineColor: [226, 232, 240], // Slate 200
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [0, 40, 85], // PAWA Blue
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252], // Slate 50
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 35 },
      2: { cellWidth: 30 },
      3: { cellWidth: 'auto' }
    },
    didDrawPage: addFooter,
  });

  doc.save('pawa-consultation-report.pdf');
};
