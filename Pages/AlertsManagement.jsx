import React, { useState, useEffect } from 'react';
import { SecurityAlert } from '@/entities/SecurityAlert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Check, ShieldAlert, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';

export default function AlertsManagement() {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setIsLoading(true);
    const data = await SecurityAlert.list('-created_date');
    setAlerts(data);
    setIsLoading(false);
  };
  
  const updateAlertStatus = async (alertId, status) => {
    await SecurityAlert.update(alertId, { status });
    fetchAlerts();
  };
  
  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'Critical': return 'border-red-700 bg-red-100 text-red-800';
      case 'High': return 'border-red-500 bg-red-50 text-red-700';
      case 'Medium': return 'border-orange-500 bg-orange-50 text-orange-700';
      case 'Low': return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      default: return 'border-gray-300';
    }
  };

  if (isLoading) return <div className="p-6">Loading alerts...</div>;

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--navy-deep)]">Alerts Management</h1>
        <p className="text-gray-600">Review and manage all system-wide security alerts.</p>
      </header>
      <div className="space-y-4">
        {alerts.map(alert => (
          <Card key={alert.id} className={`bg-white/80 backdrop-blur-lg border-l-4 shadow-lg ${getSeverityStyles(alert.severity)}`}>
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
              <div className="md:col-span-3">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5"/>
                  <h3 className="font-semibold text-lg">{alert.title}</h3>
                </div>
                <p className="text-sm text-gray-600 ml-8">{alert.description}</p>
              </div>
              <div className="text-center">
                <Badge variant="outline">{alert.category}</Badge>
              </div>
              <div className="text-center">
                <Badge variant="secondary">{alert.status}</Badge>
              </div>
              <div className="flex gap-2 justify-end">
                {alert.status === 'Open' && (
                  <Button size="sm" onClick={() => updateAlertStatus(alert.id, 'Resolved')} className="bg-green-600 hover:bg-green-700">
                    <Check className="w-4 h-4 mr-2"/> Resolve
                  </Button>
                )}
                 {alert.status === 'Open' && (
                  <Button size="sm" variant="destructive" onClick={() => updateAlertStatus(alert.id, 'In Progress')} className="bg-orange-500 hover:bg-orange-600">
                    <ShieldAlert className="w-4 h-4 mr-2"/> Escalate
                  </Button>
                )}
                {alert.status !== 'Open' && (
                  <Button size="sm" variant="outline" onClick={() => updateAlertStatus(alert.id, 'Open')}>Re-open</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}