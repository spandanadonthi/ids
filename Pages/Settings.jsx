import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, RefreshCw } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    darkMode: false,
    emailNotifications: true,
    detectionThreshold: 'medium',
    loggingLevel: 'standard'
  });
  
  const handleSave = () => {
    // In a real app, this would save to a backend
    alert("Settings saved successfully!");
  };
  
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--navy-deep)]">System Settings</h1>
        <p className="text-gray-600">Configure IDS behavior and application preferences.</p>
      </header>

      <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
            <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
              <span>Dark Mode</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Enable dark theme across the application.
              </span>
            </Label>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => setSettings(s => ({ ...s, darkMode: checked }))}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
            <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive email alerts for high-severity threats.
              </span>
            </Label>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings(s => ({ ...s, emailNotifications: checked }))}
            />
          </div>
          {/* Add more settings as needed */}
        </CardContent>
        <div className="p-6 border-t flex justify-end gap-3">
          <Button variant="outline"><RefreshCw className="w-4 h-4 mr-2"/> Reset Defaults</Button>
          <Button onClick={handleSave} className="bg-[var(--navy-deep)] hover:bg-[var(--aqua-soft)] hover:text-[var(--navy-deep)]">
            <Save className="w-4 h-4 mr-2"/> Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}