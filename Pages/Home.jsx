
import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Upload, HelpCircle, ArrowRight, Zap, Lock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Home() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.log("User not authenticated");
    }
    setIsLoading(false);
  };

  const handleLogin = async () => {
    await User.login();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#A1D6E2] border-t-[#1A3E5D] rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#B9E5E8]/20 via-[#A7E6FF]/20 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[var(--navy-deep)] to-[var(--aqua-soft)] rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[var(--navy-deep)] mb-2">AquaShield</h1>
            <p className="text-gray-600 text-lg">Advanced Intrusion Detection System</p>
          </div>

          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-[#1A3E5D] mb-2">
                  Secure Your Digital Environment
                </h2>
                <p className="text-gray-600">
                  AI-powered threat detection and real-time security monitoring
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-[#A1D6E2]/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#1A3E5D]" />
                  </div>
                  <span>Real-time threat detection</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-[#A1D6E2]/20 rounded-lg flex items-center justify-center">
                    <Lock className="w-4 h-4 text-[#1A3E5D]" />
                  </div>
                  <span>File security scanning</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-[#A1D6E2]/20 rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-[#1A3E5D]" />
                  </div>
                  <span>24/7 monitoring & alerts</span>
                </div>
              </div>

              <Button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-[var(--navy-deep)] to-[var(--aqua-soft)] hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-white font-semibold py-3"
              >
                Sign In with Google
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B9E5E8]/20 via-[#A7E6FF]/20 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--navy-deep)] to-[var(--aqua-soft)] rounded-xl flex items-center justify-center shadow-lg transform -rotate-3 animate-pulse">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[var(--navy-deep)]">
              Welcome back, {user?.full_name?.split(' ')[0] || 'User'}
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Your security command center is ready. Monitor, scan, and protect.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="group bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--aqua-soft)] to-[var(--navy-deep)] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--navy-deep)] mb-3">Security Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Monitor your security status, recent alerts, and system activity in real-time.
              </p>
              <Link to={createPageUrl("Dashboard")}>
                <Button className="bg-[var(--navy-deep)] hover:bg-[var(--aqua-soft)] hover:text-[var(--navy-deep)] transition-all duration-300">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--navy-deep)] to-[var(--aqua-soft)] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--navy-deep)] mb-3">File Scanner</h3>
              <p className="text-gray-600 mb-6">
                Upload and scan files for potential security threats using advanced AI detection.
              </p>
              <Link to={createPageUrl("Upload")}>
                <Button className="bg-[var(--aqua-soft)] hover:bg-[var(--navy-deep)] text-[var(--navy-deep)] hover:text-white transition-all duration-300">
                  Upload & Scan
                  <Upload className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--aqua-soft)] to-[var(--navy-deep)] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--navy-deep)] mb-3">Support Center</h3>
              <p className="text-gray-600 mb-6">
                Get help, access documentation, and chat with our security experts.
              </p>
              <Link to={createPageUrl("Support")}>
                <Button variant="outline" className="border-[var(--navy-deep)] text-[var(--navy-deep)] hover:bg-[var(--navy-deep)] hover:text-white transition-all duration-300">
                  Contact Support
                  <HelpCircle className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Status Bar */}
        <Card className="bg-white/60 backdrop-blur-lg border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[var(--navy-deep)] font-semibold">System Status: Secure</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>Last Scan: Active</span>
                <span>Threats Detected: 0</span>
                <span>Protection Level: Maximum</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
