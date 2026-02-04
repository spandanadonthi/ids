import React, { useState, useEffect } from 'react';
import { ActivityLog } from '@/entities/ActivityLog';
import { SecurityAlert } from '@/entities/SecurityAlert';
import { User } from '@/entities/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Upload, Bell, Clock, ShieldCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      
      const userLogs = await ActivityLog.filter({ user_email: currentUser.email }, '-created_date', 5);
      setLogs(userLogs);
      
      // Note: This needs a more sophisticated query in a real backend.
      // We are fetching all alerts and filtering on the client, which is not ideal for production.
      const allAlerts = await SecurityAlert.list('-created_date', 100);
      const userAlerts = allAlerts.filter(alert => 
        alert.description.includes(currentUser.email) || alert.assigned_to === currentUser.email
      ).slice(0, 5);
      setAlerts(userAlerts);
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
    setIsLoading(false);
  };
  
  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--navy-deep)]">My Security Dashboard</h1>
          <p className="text-gray-600">Your personal security overview and activity.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[var(--navy-deep)]">Open Alerts</CardTitle>
              <Bell className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--navy-deep)]">{alerts.filter(a => a.status === 'Open').length}</div>
              <p className="text-xs text-gray-500">Active threats needing attention</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[var(--navy-deep)]">Last Activity</CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--navy-deep)]">
                {logs.length > 0 ? formatDistanceToNow(new Date(logs[0].created_date), { addSuffix: true }) : 'N/A'}
              </div>
              <p className="text-xs text-gray-500">Your most recent recorded action</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[var(--navy-deep)]">Protection Status</CardTitle>
              <ShieldCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-gray-500">Your account is monitored</p>
            </CardContent>
          </Card>
           <Link to={createPageUrl("Upload")} className="flex items-center justify-center p-6 bg-gradient-to-br from-[var(--navy-deep)] to-[var(--aqua-soft)] rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow">
            <div className="text-center">
              <Upload className="h-8 w-8 mx-auto mb-2"/>
              <h3 className="font-semibold">Upload File for Scan</h3>
            </div>
           </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[var(--navy-deep)]">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {alerts.map(alert => (
                  <li key={alert.id} className="flex items-start gap-4 p-3 bg-gray-50/50 rounded-lg">
                    <div className="w-8 h-8 flex-shrink-0 bg-red-100 rounded-full flex items-center justify-center">
                      <Bell className="w-4 h-4 text-red-600"/>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                      <time className="text-xs text-gray-400">{formatDistanceToNow(new Date(alert.created_date), { addSuffix: true })}</time>
                    </div>
                  </li>
                ))}
                {alerts.length === 0 && <p className="text-gray-500">No recent alerts for your account.</p>}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[var(--navy-deep)]">Login Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {logs.map(log => (
                  <li key={log.id} className="flex items-start gap-4 p-3 bg-gray-50/50 rounded-lg">
                    <div className="w-8 h-8 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600"/>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{log.action} on {log.resource}</h4>
                      <p className="text-sm text-gray-600">{log.details}</p>
                      <time className="text-xs text-gray-400">{formatDistanceToNow(new Date(log.created_date), { addSuffix: true })}</time>
                    </div>
                  </li>
                ))}
                {logs.length === 0 && <p className="text-gray-500">No recent activity found.</p>}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}