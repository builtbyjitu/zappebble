'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Contact & Support
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
          Have a feature request, bug report, or partnership inquiry? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Message Received!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Thank you for reaching out. We review user feedback and tool suggestions continuously.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSubmitted(false);
                setEmail('');
                setSubject('');
                setMessage('');
              }}
            >
              Send Another Note
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Your Email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={16} />}
            />

            <Input
              label="Subject / Tool Name"
              type="text"
              required
              placeholder="e.g. Suggestion for Image Compressor"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              leftIcon={<MessageSquare size={16} />}
            />

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Your Feedback or Message
              </label>
              <textarea
                rows={5}
                required
                placeholder="Describe your issue or suggestion in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              leftIcon={<Send size={16} />}
              className="w-full sm:w-auto"
            >
              Submit Message
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
