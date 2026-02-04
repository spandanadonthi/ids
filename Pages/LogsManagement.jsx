import React, { useState, useEffect } from 'react';
import { ActivityLog } from '@/entities/ActivityLog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Search } from 'lucide-react';
import { format } from 'date-fns';

export default function LogsManagement() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);
  
  useEffect(() => {
    const results = logs.filter(log =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLogs(results);
  }, [searchTerm, logs]);

  const fetchLogs = async () => {
    setIsLoading(true);
    const data = await ActivityLog.list('-created_date');
    setLogs(data);
    setFilteredLogs(data);
    setIsLoading(false);
  };
  
  const downloadLogs = () => {
     const csvContent = [
      ['ID', 'Timestamp', 'User Email', 'Action', 'Resource', 'Details', 'IP Address'],
      ...filteredLogs.map(log => [
        log.id,
        format(new Date(log.created_date), 'yyyy-MM-dd HH:mm:ss'),
        log.user_email,
        log.action,
        log.resource,
        log.details,
        log.ip_address
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'activity-logs.csv';
    link.click();
  };

  if (isLoading) return <div className="p-6">Loading logs...</div>;

  return (
    <div className="p-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[var(--navy-deep)]">Logs Management</h1>
          <p className="text-gray-600">Search and review all system activity logs.</p>
        </div>
        <Button onClick={downloadLogs}><Download className="w-4 h-4 mr-2"/> Download Logs</Button>
      </header>
      <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
            <Input 
              placeholder="Search logs by action, user, or details..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map(log => (
                <TableRow key={log.id}>
                  <TableCell>{format(new Date(log.created_date), 'PPpp')}</TableCell>
                  <TableCell>{log.user_email}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}