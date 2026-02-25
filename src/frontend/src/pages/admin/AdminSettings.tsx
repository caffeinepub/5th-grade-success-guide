import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePomodoroSettings, useUpdatePomodoroSettings } from '@/hooks/useQueries';
import { toast } from 'sonner';

export default function AdminSettings() {
  const { data: settings, isLoading } = usePomodoroSettings();
  const updateSettings = useUpdatePomodoroSettings();
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  React.useEffect(() => {
    if (settings) {
      setFocusTime(Number(settings.focusTime));
      setBreakTime(Number(settings.breakTime));
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync({
        focusTime: BigInt(focusTime),
        breakTime: BigInt(breakTime),
      });
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure platform settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pomodoro Timer Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="focus-time">Focus Time (minutes)</Label>
            <Input
              id="focus-time"
              type="number"
              min="1"
              max="60"
              value={focusTime}
              onChange={(e) => setFocusTime(parseInt(e.target.value) || 25)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="break-time">Break Time (minutes)</Label>
            <Input
              id="break-time"
              type="number"
              min="1"
              max="30"
              value={breakTime}
              onChange={(e) => setBreakTime(parseInt(e.target.value) || 5)}
            />
          </div>
          <Button onClick={handleSave} disabled={updateSettings.isPending}>
            {updateSettings.isPending ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
