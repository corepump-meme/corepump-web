'use client';

import { useState } from 'react';
import { createContact } from '@/app/actions/notify';

export default function NotifyForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('email', email);

    try {
      const result = await createContact(formData);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Success! You\'ll be the first to know when we launch.' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address..."
          className="flex-1 px-4 py-3 rounded-full border border-black/[.08] dark:border-white/[.145] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="rounded-full border border-solid border-transparent transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 font-medium text-sm sm:text-base h-12 px-6 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? 'SUBSCRIBING...' : 'NOTIFY ME'}
        </button>
      </div>
      
      {message && (
        <div className={`text-sm text-center animate-fade-in ${
          message.type === 'success' 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-red-600 dark:text-red-400'
        }`}>
          {message.text}
        </div>
      )}
      
      <p className="text-xs text-gray-500 dark:text-gray-400">
        We respect your privacy. No spam, just launch alerts and early access info.
      </p>
    </form>
  );
}
