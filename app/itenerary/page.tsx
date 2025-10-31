'use client';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { Textarea } from "./_components/ui/textarea";
import { Card, CardContent } from "./_components/ui/card";

export default function ItineraryPage() {
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    people: '',
    budget: '',
    month: ''
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState('');
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setItinerary('');

    const res = await fetch('http://localhost:5050/api/itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setItinerary(data.itinerary);
    setLoading(false);
  };

  const downloadPDF = () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  const lines = itinerary.split('\n');
  
  lines.forEach((line) => {
    if (yPosition > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }

    if (line.startsWith('# ')) {
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      const text = line.replace('# ', '');
      pdf.text(text, margin, yPosition);
      yPosition += 10;
    } else if (line.startsWith('## ')) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      const text = line.replace('## ', '');
      yPosition += 5;
      pdf.text(text, margin, yPosition);
      yPosition += 8;
    } else if (line.startsWith('### ')) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      const text = line.replace('### ', '');
      yPosition += 4;
      pdf.text(text, margin, yPosition);
      yPosition += 7;
    }
    else  if (line.includes('**')) {
    // Split the line by the ** markers
    const splitLine = line.split('**');
    
    // Loop through the split parts and format accordingly
    splitLine.forEach((part, index) => {
      if (index % 2 === 0) { 
        // Regular text (not inside **), normal font
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const splitText = pdf.splitTextToSize(part, maxWidth);
        pdf.text(splitText, margin, yPosition);
        yPosition += splitText.length * 5 + 2;
      } else { 
        // Text inside ** (bold)
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        const splitText = pdf.splitTextToSize(part, maxWidth);
        pdf.text(splitText, margin, yPosition);
        yPosition += splitText.length * 5 + 2;
      }
    });
  } 
    else if (line.startsWith('- ')) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const text = line.replace('- ', '').replace(/\*\*/g, '');
      const splitText = pdf.splitTextToSize(text, maxWidth - 5);
      pdf.text('•', margin, yPosition);
      pdf.text(splitText, margin + 5, yPosition);
      yPosition += splitText.length * 5 + 2;
    } else if (line.trim() !== '') {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const splitText = pdf.splitTextToSize(line, maxWidth);
      pdf.text(splitText, margin, yPosition);
      yPosition += splitText.length * 5 + 2;
    } else {
      yPosition += 3;
    }
  });

  pdf.save(`${formData.destination || 'Trek'}-Itinerary.pdf`);
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-teal-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">TrekVerse Itinerary Planner</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Destination (e.g., Annapurna Base Camp)" name="destination" value={formData.destination} onChange={handleChange} required />
            <Input placeholder="Number of Days (e.g., 7)" name="days" value={formData.days} onChange={handleChange} required />
            <Input placeholder="Number of People" name="people" value={formData.people} onChange={handleChange} required />
            <Input placeholder="Budget Range (e.g., $300-$500)" name="budget" value={formData.budget} onChange={handleChange} required />
            <Input placeholder="Preferred Month (e.g., October)" name="month" value={formData.month} onChange={handleChange} required />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Generating...' : 'Get My Itinerary'}
            </Button>
          </form>

          {itinerary && (
            <div className="mt-6 bg-white p-4 rounded-lg shadow-lg border-2 border-gray-300">
              <div ref={pdfRef} className="prose max-w-none text-gray-900">
                <ReactMarkdown>{itinerary}</ReactMarkdown>
              </div>
              <Button onClick={downloadPDF} className="mt-4 w-full bg-green-600 hover:bg-green-700">
                Download as PDF
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
