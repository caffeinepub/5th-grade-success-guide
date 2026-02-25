import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOverallProgress } from '@/hooks/useQueries';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, FileText, ClipboardList, Calendar, Timer, Gamepad2 } from 'lucide-react';

const quickLinks = [
  { name: 'Study Tips', href: '/student/tips', icon: BookOpen, color: 'text-chart-1', bgColor: 'bg-chart-1/10' },
  { name: 'Notes', href: '/student/notes', icon: FileText, color: 'text-chart-2', bgColor: 'bg-chart-2/10' },
  { name: 'Quizzes', href: '/student/quizzes', icon: ClipboardList, color: 'text-chart-3', bgColor: 'bg-chart-3/10' },
  { name: 'Planner', href: '/student/planner', icon: Calendar, color: 'text-chart-4', bgColor: 'bg-chart-4/10' },
  { name: 'Timer', href: '/student/timer', icon: Timer, color: 'text-chart-5', bgColor: 'bg-chart-5/10' },
  { name: 'Game', href: '/student/game', icon: Gamepad2, color: 'text-primary', bgColor: 'bg-primary/10' },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: progress, isLoading } = useOverallProgress();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display text-foreground">Welcome back, {user?.name || 'Student'}!</h1>
        <p className="text-muted-foreground mt-2">Ready to learn something new today?</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading progress...</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Quiz Attempts</p>
                <p className="text-2xl font-bold text-foreground">
                  {progress?.quizScores?.length || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Study Hours</p>
                <p className="text-2xl font-bold text-foreground">
                  {progress?.studyHours ? progress.studyHours.toString() : '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Game Level</p>
                <p className="text-2xl font-bold text-foreground">
                  {progress?.gameProgressData?.currentLevel ? progress.gameProgressData.currentLevel.toString() : '1'}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-display text-foreground mb-4">Quick Access</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link key={link.name} to={link.href}>
              <Card className="shadow-card hover:shadow-card-hover transition-all cursor-pointer h-full">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className={`p-4 rounded-full ${link.bgColor}`}>
                    <link.icon className={`h-8 w-8 ${link.color}`} />
                  </div>
                  <p className="font-semibold text-foreground">{link.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
