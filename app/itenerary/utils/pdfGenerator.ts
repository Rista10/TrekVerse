import { jsPDF } from 'jspdf';

export const generatePDF = (itinerary: string, destination: string) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  const lines = itinerary.split('\n');
  
  lines.forEach((line) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }

    if (line.startsWith('# ')) {
      // Main heading
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      const text = line.replace('# ', '');
      pdf.text(text, margin, yPosition);
      yPosition += 10;
    } else if (line.startsWith('## ')) {
      // Subheading
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      const text = line.replace('## ', '');
      yPosition += 5;
      pdf.text(text, margin, yPosition);
      yPosition += 8;
    } else if (line.startsWith('### ')) {
      // Sub-subheading
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      const text = line.replace('### ', '');
      yPosition += 4;
      pdf.text(text, margin, yPosition);
      yPosition += 7;
    } else if (line.includes('**')) {
      // Handle bold text inline
      const parts = line.split('**');
      let xPosition = margin;
      
      parts.forEach((part, index) => {
        if (part.trim()) {
          pdf.setFontSize(10);
          if (index % 2 === 1) {
            pdf.setFont('helvetica', 'bold');
          } else {
            pdf.setFont('helvetica', 'normal');
          }
          
          const splitText = pdf.splitTextToSize(part, maxWidth);
          pdf.text(splitText, xPosition, yPosition);
          yPosition += splitText.length * 5;
        }
      });
      yPosition += 2;
    } else if (line.startsWith('- ')) {
      // Bullet point
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const text = line.replace('- ', '').replace(/\*\*/g, '');
      const splitText = pdf.splitTextToSize(text, maxWidth - 5);
      pdf.text('•', margin, yPosition);
      pdf.text(splitText, margin + 5, yPosition);
      yPosition += splitText.length * 5 + 2;
    } else if (line.trim() !== '') {
      // Regular text
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const splitText = pdf.splitTextToSize(line, maxWidth);
      pdf.text(splitText, margin, yPosition);
      yPosition += splitText.length * 5 + 2;
    } else {
      // Empty line
      yPosition += 3;
    }
  });

  pdf.save(`${destination || 'Trek'}-Itinerary.pdf`);
};
