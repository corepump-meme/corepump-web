'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, R2_CONFIG } from '@/lib/r2-client';

export interface UploadResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export async function uploadTokenImage(formData: FormData): Promise<UploadResult> {
  try {
    const file = formData.get('image') as File;
    
    // Validation
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    if (file.size > R2_CONFIG.maxFileSize) {
      return { success: false, error: 'File too large (max 5MB)' };
    }

    if (!R2_CONFIG.allowedTypes.includes(file.type as any)) {
      return { success: false, error: 'Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.' };
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop() || 'jpg';
    const fileName = `tokens/${timestamp}-${randomString}.${extension}`;

    // Convert file to buffer
    const buffer = await file.arrayBuffer();

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: fileName,
      Body: new Uint8Array(buffer),
      ContentType: file.type,
      CacheControl: 'public, max-age=31536000', // 1 year cache
      Metadata: {
        'uploaded-at': new Date().toISOString(),
        'original-name': file.name,
      },
    });

    await r2Client.send(command);

    // Construct public URL
    const imageUrl = `${R2_CONFIG.publicUrl}/${fileName}`;

    return {
      success: true,
      imageUrl,
    };

  } catch (error) {
    console.error('R2 upload error:', error);
    return {
      success: false,
      error: 'Upload failed. Please try again.',
    };
  }
}

export async function validateImageFile(file: File): Promise<{ isValid: boolean; error?: string }> {
  // Size validation
  if (file.size > R2_CONFIG.maxFileSize) {
    return {
      isValid: false,
      error: `File size must be less than ${Math.round(R2_CONFIG.maxFileSize / 1024 / 1024)}MB`,
    };
  }

  // Type validation
  if (!R2_CONFIG.allowedTypes.includes(file.type as any)) {
    return {
      isValid: false,
      error: 'Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.',
    };
  }

  // Additional validation could include:
  // - Image dimensions
  // - Content validation (actual image vs renamed file)
  
  return { isValid: true };
}
