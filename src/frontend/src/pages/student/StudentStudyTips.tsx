import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAllStudyTips, useSearchStudyTips } from '@/hooks/useQueries';
import { Subject } from '@/backend';
import { Search } from 'lucide-react';

const subjects = [
  { value: Subject.math, label: 'Math' },
  { value: Subject.science, label: 'Science' },
  { value: Subject.grammar, label: 'Grammar' },
  { value: Subject.reading, label: 'Reading' },
  { value: Subject.socialStudies, label: 'Social Studies' },
];

export default function StudentStudyTips() {
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: allTips = [], isLoading } = useAllStudyTips();
  const { data: searchResults = [] } = useSearchStudyTips(searchQuery);

  const displayedTips = searchQuery
    ? searchResults
    : filterSubject === 'all'
    ? allTips
    : allTips.filter((tip) => tip.subject === filterSubject);

  const getSubjectBadgeColor = (subject: Subject) => {
    const colors = {
      math: 'bg-chart-1/20 text-chart-1',
      science: 'bg-chart-2/20 text-chart-2',
      grammar: 'bg-chart-3/20 text-chart-3',
      reading: 'bg-chart-4/20 text-chart-4',
      socialStudies: 'bg-chart-5/20 text-chart-5',
    };
    return colors[subject] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-foreground">Study Tips</h1>
        <p className="text-muted-foreground mt-2">
          Learn helpful strategies to improve your grades
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search study tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterSubject} onValueChange={setFilterSubject}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject.value} value={subject.value}>
                {subject.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading study tips...</div>
      ) : displayedTips.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No study tips found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedTips.map((tip) => (
            <Card key={tip.id.toString()} className="shadow-card hover:shadow-card-hover transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2">{tip.title}</CardTitle>
                  <Badge className={getSubjectBadgeColor(tip.subject)} variant="secondary">
                    {subjects.find((s) => s.value === tip.subject)?.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{tip.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
