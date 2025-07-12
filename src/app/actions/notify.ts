'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createContact(formData: FormData) {
  const email = formData.get('email') as string;
  
  if (!email) {
    return { success: false, error: 'Email is required' };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address' };
  }

  try {
    await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    return { success: true };
  } catch (error) {
    console.error('Error creating contact:', error);
    return { success: false, error: 'Failed to subscribe. Please try again.' };
  }
}
