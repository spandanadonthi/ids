import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, Zap } from 'lucide-react';

export default function ScanProgress({ progress }) {
  return (
    <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#1A3E5D] to-[#A1D6E2] rounded-full flex items-center justify-center animate-pulse">
          <Shield className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-2xl font-semibold text-[#1A3E5D] mb-3">
          🔍 Scanning Files for Threats
        </h3>
        
        <p className="text-gray-600 mb-6">
          Our advanced AI is analyzing your files for potential security risks...
        </p>

        <div className="max-w-md mx-auto mb-6">
          <Progress 
            value={progress} 
            className="h-3 bg-gray-200"
          />
          <p className="text-sm text-gray-500 mt-2">
            {Math.round(progress)}% Complete
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#A1D6E2]" />
            <span>Deep Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#1A3E5D]" />
            <span>Threat Detection</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}