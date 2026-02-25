import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAllNotes } from '@/hooks/useQueries';
import { Download } from 'lucide-react';

const subjects = [
  { value: 'math', label: 'Math' },
  { value: 'science', label: 'Science' },
  { value: 'grammar', label: 'Grammar' },
  { value: 'reading', label: 'Reading' },
  { value: 'socialStudies', label: 'Social Studies' },
];

export default function StudentNotes() {
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const { data: allNotes = [], isLoading } = useAllNotes();

  const displayedNotes = filterSubject === 'all'
    ? allNotes
    : allNotes.filter((note) => note.subject === filterSubject);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display text-foreground">Notes & Downloads</h1>
          <p className="text-muted-foreground mt-2">
            Access study materials and notes
          </p>
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
        <div className="text-center py-12">Loading notes...</div>
      ) : displayedNotes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No notes available.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedNotes.map((note) => (
            <Card key={note.id.toString()} className="shadow-card hover:shadow-card-hover transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{note.fileName}</CardTitle>
                <Badge variant="secondary">
                  {subjects.find((s) => s.value === note.subject)?.label}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{note.description}</p>
                <Button size="sm" onClick={() => window.open(note.blob.getDirectURL(), '_blank')}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
