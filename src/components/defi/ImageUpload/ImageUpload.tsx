'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { uploadTokenImage, validateImageFile } from '@/app/actions/upload-actions';
import { Button, Alert } from '@/components';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
  className?: string;
}

export function ImageUpload({ onImageUploaded, currentImage, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    // Client-side validation
    const validation = await validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setUploading(true);

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Upload to R2
    const formData = new FormData();
    formData.append('image', file);

    try {
      const result = await uploadTokenImage(formData);
      
      if (result.success && result.imageUrl) {
        onImageUploaded(result.imageUrl);
      } else {
        setError(result.error || 'Upload failed');
        setPreview(currentImage || null);
      }
    } catch (error) {
      setError('Upload failed. Please try again.');
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setError(null);
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="text-label text-gray-700">Token Image (Optional)</label>
      
      <div className="flex items-start gap-4">
        {/* Preview Area */}
        <div className="relative">
          <div className="w-20 h-20 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-all duration-200 hover:border-core-orange-300">
            {preview ? (
              <>
                <img 
                  src={preview} 
                  alt="Token preview" 
                  className="w-full h-full object-cover rounded-lg"
                />
                {!uploading && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-error-500 text-white rounded-full flex items-center justify-center hover:bg-error-600 transition-colors duration-200 shadow-sm"
                    aria-label="Remove image"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                )}
              </>
            ) : (
              <FiImage className="w-8 h-8 text-gray-400" />
            )}
          </div>
          
          {uploading && (
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
            
            <Button
              type="button"
              variant="secondary"
              size="sm"
              loading={uploading}
              onClick={handleUploadClick}
              icon={FiUpload}
              iconPosition="left"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : preview ? 'Change Image' : 'Upload Image'}
            </Button>

            {preview && !uploading && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveImage}
                icon={FiX}
                iconPosition="left"
              >
                Remove
              </Button>
            )}
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>Recommended: 400x400px, max 5MB</p>
            <p>Supports JPG, PNG, GIF, WebP</p>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="error" description={error} />
      )}
    </div>
  );
}
