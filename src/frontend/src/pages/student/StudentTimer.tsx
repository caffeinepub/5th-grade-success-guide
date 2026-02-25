import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePomodoroSettings } from '@/hooks/useQueries';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function StudentTimer() {
  const { data: settings } = usePomodoroSettings();
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    if (settings) {
      setMinutes(Number(settings.focusTime));
    }
  }, [settings]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsRunning(false);
            if (!isBreak) {
              setSessions((prev) => prev + 1);
              setMinutes(settings ? Number(settings.breakTime) : 5);
              setIsBreak(true);
            } else {
              setMinutes(settings ? Number(settings.focusTime) : 25);
              setIsBreak(false);
            }
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, minutes, seconds, isBreak, settings]);

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(settings ? Number(settings.focusTime) : 25);
    setSeconds(0);
    setIsBreak(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-foreground">Pomodoro Timer</h1>
        <p className="text-muted-foreground mt-2">
          Stay focused with timed study sessions
        </p>
      </div>

      <Card className="shadow-card max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            {isBreak ? 'Break Time!' : 'Focus Time'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-display text-foreground">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Sessions completed: {sessions}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              size="lg"
              onClick={() => setIsRunning(!isRunning)}
              className="w-32"
            >
              {isRunning ? (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Start
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleReset}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
