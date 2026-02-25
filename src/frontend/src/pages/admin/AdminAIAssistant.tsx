import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Trash2, Save, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome',
    role: 'ai',
    text: "Hello! I'm your AI teaching assistant. I can help you with lesson planning, student progress insights, game recommendations, and more. What would you like to know?",
    timestamp: new Date(),
  },
];

const AI_RESPONSES = [
  "That's a great question! Based on your current class data, I recommend focusing on math fundamentals this week. Several students are showing improvement in fractions.",
  "I can help with that! Looking at the recent game completion rates, Level 2 (Math) has the highest engagement. Consider assigning it to students who need extra practice.",
  "Great idea! For lesson planning this week, I suggest covering decimal operations since quiz scores show the class averaged 68% on that topic last session.",
  "Based on student progress data, 3 students have completed all available levels. It might be time to create new advanced challenges to keep them engaged.",
  "I noticed the leaderboard has been quite competitive lately! Recognizing the top performers during class can boost overall motivation significantly.",
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function AdminAIAssistant() {
  const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const responseIndex = useRef(0);

  // Scroll to bottom whenever the chat updates - ref-based, no reactive deps needed
  useEffect(() => {
    const el = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (el) el.scrollTop = el.scrollHeight;
  });

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiText = AI_RESPONSES[responseIndex.current % AI_RESPONSES.length];
      responseIndex.current += 1;

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: aiText,
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    responseIndex.current = 0;
    toast.success('Chat cleared');
    inputRef.current?.focus();
  };

  const handleSaveChat = () => {
    toast.success('Chat saved successfully');
  };

  const handleDownloadTranscript = () => {
    const lines = messages.map(
      (m) => `[${formatTime(m.timestamp)}] ${m.role === 'ai' ? 'AI Assistant' : 'You'}: ${m.text}`
    );
    const blob = new Blob([lines.join('\n\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-chat-transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Transcript downloaded');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[820px]">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-display text-foreground">AI Assistant</h1>
        <p className="text-muted-foreground mt-1">Your intelligent teaching companion</p>
      </div>

      {/* Chat Container */}
      <div className="flex flex-col flex-1 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
          <div className="p-2 rounded-full bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">AI Teaching Assistant</p>
            <p className="text-xs text-muted-foreground">Always available to help</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="p-1.5 rounded-full bg-primary/10 shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    <span
                      className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Action Buttons + Input */}
        <div className="border-t border-border bg-card px-4 py-3 space-y-3">
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={handleClearChat}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear Chat
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={handleSaveChat}
            >
              <Save className="h-3.5 w-3.5" />
              Save Chat
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={handleDownloadTranscript}
            >
              <Download className="h-3.5 w-3.5" />
              Download Transcript
            </Button>
          </div>

          {/* Input Row */}
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your students or teaching..."
              className="flex-1 bg-muted/40 border-border focus:bg-card"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn('flex items-end gap-2', isUser ? 'justify-end' : 'justify-start')}
    >
      {!isUser && (
        <div className="p-1.5 rounded-full bg-primary/10 shrink-0">
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-sm'
            : 'bg-muted text-foreground rounded-bl-sm'
        )}
      >
        <p>{message.text}</p>
        <p
          className={cn(
            'text-[10px] mt-1',
            isUser ? 'text-primary-foreground/60 text-right' : 'text-muted-foreground'
          )}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
