# 5th Grade Success Guide

## Current State

The app has:
- Authentication: username/password login and registration (no email required), role-based (admin/student)
- Admin Dashboard with sidebar layout containing: Overview, Study Tips, Notes, Quizzes, Users, Settings
- Student Dashboard with: Overview, Study Tips, Notes, Quizzes, Planner, Timer, Game
- Educational teal/blue color palette, Nunito + Fredoka One fonts
- Backend APIs: study tips, quizzes, notes, game progress, leaderboard, pomodoro settings, user management

## Requested Changes (Diff)

### Add
- New admin sidebar nav items: "Game Management" and "AI Assistant" (replacing Quizzes and Notes)
- New admin page: Game Management with 7 feature tiles: Create New Game, Leaderboard, Student Progress Tracking, Assign Game to Class, Performance Analytics, Game Library, Live Game Control Panel
- New admin page: AI Assistant - full-width dedicated chatbot page with teacher messages right-aligned, AI responses left-aligned, typing animation, fixed bottom input, Clear/Save/Download transcript buttons
- Admin Overview: replace quiz/notes stats with "Active Games" and "Class Performance Snapshot"; add Recent Activity Feed and Quick Launch Game Button

### Modify
- AdminLayout.tsx: Replace sidebar nav items (remove Notes /admin/notes and Quizzes /admin/quizzes routes), add Game Management (/admin/games) and AI Assistant (/admin/ai) routes
- AdminOverview.tsx: Replace "Quizzes" and "Notes" stat cards with "Active Games" and "Class Performance" cards; add activity feed and quick launch game section
- App.tsx: Add routes for adminGamesRoute and adminAIRoute; remove adminNotesRoute and adminQuizzesRoute

### Remove
- AdminNotes.tsx page and its route from App.tsx
- AdminQuizzes.tsx page and its route from App.tsx
- Navigation links to Notes and Quizzes in AdminLayout.tsx

## Implementation Plan

1. Update AdminLayout.tsx - new navigation with Game Management and AI Assistant, remove Notes and Quizzes
2. Update AdminOverview.tsx - new stat cards (Total Students, Active Games, Class Performance, Total Users), Recent Activity Feed section, Quick Launch Game button
3. Create AdminGameManagement.tsx - 7 game feature tiles with stats previews, hover states, cards layout
4. Create AdminAIAssistant.tsx - full-width chat UI, right/left aligned messages, typing animation, transcript tools, fixed input
5. Update App.tsx - add new routes, remove old Notes/Quizzes routes

## UX Notes
- Match current design system: Nunito/Fredoka fonts, teal/blue palette from index.css, rounded-lg cards, soft shadows
- Smooth animated transitions between sidebar sections
- Game Management tiles should use colorful accent cards (chart colors) with icon + title + description + quick stat
- AI Assistant chat should feel clean and modern, teacher avatar on right, AI avatar on left
- Dark mode compatible using existing CSS variables
- Sidebar collapses on mobile (already implemented pattern to follow)
- No references to Quizzes, Timer, or Notes anywhere in the Admin section
