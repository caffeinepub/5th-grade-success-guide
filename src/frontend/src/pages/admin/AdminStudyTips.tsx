import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  useAllStudyTips,
  useCreateStudyTip,
  useUpdateStudyTip,
  useDeleteStudyTip,
  useSearchStudyTips,
} from '@/hooks/useQueries';
import type { StudyTip } from '@/backend';
import { Subject } from '@/backend';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

const subjects = [
  { value: Subject.math, label: 'Math' },
  { value: Subject.science, label: 'Science' },
  { value: Subject.grammar, label: 'Grammar' },
  { value: Subject.reading, label: 'Reading' },
  { value: Subject.socialStudies, label: 'Social Studies' },
];

export default function AdminStudyTips() {
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTip, setSelectedTip] = useState<StudyTip | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    subject: Subject.math,
  });

  const { data: allTips = [], isLoading } = useAllStudyTips();
  const { data: searchResults = [] } = useSearchStudyTips(searchQuery);
  const createTip = useCreateStudyTip();
  const updateTip = useUpdateStudyTip();
  const deleteTip = useDeleteStudyTip();

  const displayedTips = searchQuery
    ? searchResults
    : filterSubject === 'all'
    ? allTips
    : allTips.filter((tip) => tip.subject === filterSubject);

  const handleCreate = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createTip.mutateAsync(formData);
      toast.success('Study tip created successfully');
      setIsCreateOpen(false);
      setFormData({ title: '', content: '', subject: Subject.math });
    } catch (error) {
      toast.error('Failed to create study tip');
    }
  };

  const handleUpdate = async () => {
    if (!selectedTip || !formData.title || !formData.content) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await updateTip.mutateAsync({
        id: selectedTip.id,
        ...formData,
      });
      toast.success('Study tip updated successfully');
      setIsEditOpen(false);
    } catch (error) {
      toast.error('Failed to update study tip');
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this study tip?')) return;

    try {
      await deleteTip.mutateAsync(id);
      toast.success('Study tip deleted successfully');
    } catch (error) {
      toast.error('Failed to delete study tip');
    }
  };

  const openEditDialog = (tip: StudyTip) => {
    setSelectedTip(tip);
    setFormData({
      title: tip.title,
      content: tip.content,
      subject: tip.subject,
    });
    setIsEditOpen(true);
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display text-foreground">Study Tips Manager</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage study tips for students
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Tip
        </Button>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={`skeleton-${i}`} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : displayedTips.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No study tips found. Create one to get started!</p>
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
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{tip.content}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(tip)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(tip.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Study Tip</DialogTitle>
            <DialogDescription>Add a helpful study tip for students</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="create-title">Title</Label>
              <Input
                id="create-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Master Multiplication Tables"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-subject">Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value as Subject })}>
                <SelectTrigger id="create-subject">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-content">Content</Label>
              <Textarea
                id="create-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your study tip here..."
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={createTip.isPending}>
              {createTip.isPending ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Study Tip</DialogTitle>
            <DialogDescription>Update the study tip information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-subject">Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value as Subject })}>
                <SelectTrigger id="edit-subject">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={updateTip.isPending}>
              {updateTip.isPending ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
