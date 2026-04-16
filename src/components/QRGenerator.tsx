"use client";

import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';

interface QRGeneratorProps {
  checkpointId: number;
  checkpointName: string;
  qrCode: string;
}

export default function QRGenerator({ checkpointId, checkpointName, qrCode }: QRGeneratorProps) {
  const handleDownload = () => {
    const svg = document.getElementById(`qr-${checkpointId}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `${qrCode}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="glass-card rounded-xl p-6 text-center">
      <h3 className="text-lg font-bold text-white mb-4">{checkpointName}</h3>
      
      <div className="bg-white p-4 rounded-lg inline-block mb-4">
        <QRCodeSVG
          id={`qr-${checkpointId}`}
          value={qrCode}
          size={200}
          level="H"
          includeMargin={true}
        />
      </div>

      <div className="text-sm text-slate-400 mb-4 font-mono">
        {qrCode}
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 mx-auto px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white transition-colors"
      >
        <Download className="w-4 h-4" />
        QR Kodu İndir
      </button>
    </div>
  );
}
