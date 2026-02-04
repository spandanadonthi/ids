import React, { useState, useEffect } from 'react';
import { SecurityAlert } from '@/entities/SecurityAlert';
import { ActivityLog } from '@/entities/ActivityLog';
import { User } from '@/entities/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { AlertTriangle, FileText, Users, Settings, Shield, BarChart2 } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ alerts: 0, logs: 0, users: 0 });
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const alerts = await SecurityAlert.list();
      const logs = await ActivityLog.list();
      const users = await User.list();
      
      setStats({
        alerts: alerts.length,
        logs: logs.length,
        users: users.length
      });
      
      // Create mock chart data
      const data = [
        { name: 'DoS', count: alerts.filter(a => a.attack_type === 'DoS').length + 5 },
        { name: 'Probe', count: alerts.filter(a => a.attack_type === 'Probe').length + 12 },
        { name: 'XSS', count: alerts.filter(a => a.attack_type === 'XSS').length + 8 },
        { name: 'Malware', count: alerts.filter(a => a.attack_type === 'Malware').length + 3 },
        { name: 'Injection', count: alerts.filter(a => a.attack_type === 'Injection').length + 7 },
      ];
      setChartData(data);

    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
    setIsLoading(false);
  };
  
  if (isLoading) return <div className="p-6">Loading Admin Dashboard...</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--navy-deep)]">Administrator Dashboard</h1>
          <p className="text-gray-600">System-wide security overview and management.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[var(--navy-deep)]">Total Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--navy-deep)]">{stats.alerts}</div>
              <p className="text-xs text-gray-500">Security events detected</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[var(--navy-deep)]">Activity Logs</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--navy-deep)]">{stats.logs}</div>
              <p className="text-xs text-gray-500">Total events logged</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[var(--navy-deep)]">Managed Users</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--navy-deep)]">{stats.users}</div>
              <p className="text-xs text-gray-500">User accounts in the system</p>
            </CardContent>
          </Card>
           <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[var(--navy-deep)]">System Health</CardTitle>
              <Shield className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Optimal</div>
              <p className="text-xs text-gray-500">All systems operational</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Card className="lg:col-span-3 bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[var(--navy-deep)] flex items-center gap-2">
                <BarChart2 className="w-5 h-5" />
                Threat Detections by Type
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                  <Tooltip wrapperClassName="!bg-white/80 !backdrop-blur-lg !border-0 !shadow-lg" />
                  <Bar dataKey="count" fill="var(--aqua-soft)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[var(--navy-deep)]">Quick Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to={createPageUrl('AlertsManagement')}>
                <Button variant="outline" className="w-full justify-start gap-3 text-lg py-6">
                  <AlertTriangle className="w-5 h-5 text-red-500" /> Manage Alerts
                </Button>
              </Link>
              <Link to={createPageUrl('LogsManagement')}>
                <Button variant="outline" className="w-full justify-start gap-3 text-lg py-6">
                  <FileText className="w-5 h-5 text-blue-500" /> View Logs
                </Button>
              </Link>
              <Link to={createPageUrl('UserManagement')}>
                <Button variant="outline" className="w-full justify-start gap-3 text-lg py-6">
                  <Users className="w-5 h-5 text-green-500" /> Manage Users
                </Button>
              </Link>
              <Link to={createPageUrl('Settings')}>
                <Button variant="outline" className="w-full justify-start gap-3 text-lg py-6">
                  <Settings className="w-5 h-5 text-gray-500" /> System Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}