import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  Download, 
  Upload, 
  FileText,
  Eye
} from 'lucide-react';

export default function ScanResults({ results, onNewScan }) {
  const getStatusColor = (classification) => {
    switch (classification) {
      case 'Normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'Attack': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (confidence) => {
    if (confidence >= 0.8) return 'bg-red-500';
    if (confidence >= 0.6) return 'bg-orange-500';
    if (confidence >= 0.4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const generateReport = () => {
    const reportData = results.map(result => ({
      fileName: result.file_name,
      classification: result.classification,
      attackType: result.attack_type || 'N/A',
      confidence: `${(result.confidence_score * 100).toFixed(1)}%`,
      evidence: result.evidence,
      recommendation: result.recommendation,
      scanDate: new Date().toISOString()
    }));

    const csvContent = [
      ['File Name', 'Classification', 'Attack Type', 'Confidence', 'Evidence', 'Recommendation', 'Scan Date'],
      ...reportData.map(row => Object.values(row))
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `security-scan-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const threatsDetected = results.filter(r => r.classification === 'Attack').length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#1A3E5D]" />
              Scan Complete
            </span>
            <div className="flex gap-2">
              <Button onClick={generateReport} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button onClick={onNewScan} size="sm" className="bg-[#A1D6E2] text-[#1A3E5D] hover:bg-[#1A3E5D] hover:text-white">
                <Upload className="w-4 h-4 mr-2" />
                Scan More Files
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-[#1A3E5D]">{results.length}</div>
              <div className="text-sm text-gray-600">Files Scanned</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{results.length - threatsDetected}</div>
              <div className="text-sm text-gray-600">Clean Files</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{threatsDetected}</div>
              <div className="text-sm text-gray-600">Threats Detected</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {results.map((result, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#A1D6E2]" />
                  <div>
                    <h3 className="font-semibold text-[#1A3E5D]">{result.file_name}</h3>
                    <p className="text-sm text-gray-500">
                      {(result.file_size / 1024 / 1024).toFixed(2)} MB • {result.file_type}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={`border ${getStatusColor(result.classification)}`}>
                    {result.classification === 'Normal' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 mr-1" />
                    )}
                    {result.classification}
                  </Badge>
                  
                  {result.file_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(result.file_url, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {result.classification === 'Attack' && (
                <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-800">
                      {result.attack_type} Attack Detected
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-red-700">Confidence:</span>
                    <div className="flex-1 bg-red-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getSeverityColor(result.confidence_score)}`}
                        style={{ width: `${result.confidence_score * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-red-800">
                      {(result.confidence_score * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Evidence:</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {result.evidence}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Recommendation:</h4>
                  <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                    {result.recommendation}
                  </p>
                </div>

                {result.technical_details && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Technical Details:</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded font-mono">
                      {result.technical_details}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}