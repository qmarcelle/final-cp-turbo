'use client';

import * as React from 'react';
import { DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../../../utils';

export interface FileWithPreview extends File {
  preview?: string;
  error?: string;
  progress?: number;
}

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: FileWithPreview[];
  onChange?: (files: FileWithPreview[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  maxSize?: number; // in bytes
  maxFiles?: number;
  preview?: boolean;
  error?: string;
  description?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({
    className,
    value = [],
    onChange,
    onUpload,
    accept,
    multiple = false,
    maxSize,
    maxFiles = 10,
    preview = true,
    error,
    description,
    disabled,
    id,
    ...props
  }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const uniqueId = React.useId();
    const inputId = id || uniqueId;

    const validateFile = React.useCallback(
      (file: File): string | null => {
        if (accept) {
          const acceptedTypes = accept.split(',').map((type) => type.trim());
          const fileType = file.type || `application/${file.name.split('.').pop()}`;
          if (!acceptedTypes.some((type) => fileType.match(type))) {
            return `File type ${fileType} is not supported`;
          }
        }

        if (maxSize && file.size > maxSize) {
          return `File size exceeds ${formatFileSize(maxSize)}`;
        }

        return null;
      },
      [accept, maxSize]
    );

    const processFiles = React.useCallback(
      async (files: FileList | File[]) => {
        if (disabled) return;

        const fileArray = Array.from(files);
        
        if (multiple && value.length + fileArray.length > maxFiles) {
          return;
        }

        const newFiles: FileWithPreview[] = await Promise.all(
          fileArray.map(async (file) => {
            const error = validateFile(file);
            const fileWithPreview = file as FileWithPreview;

            if (!error && preview) {
              try {
                if (file.type.startsWith('image/')) {
                  fileWithPreview.preview = URL.createObjectURL(file);
                }
              } catch (e) {
                console.error('Error creating preview:', e);
              }
            }

            fileWithPreview.error = error || undefined;
            fileWithPreview.progress = 0;

            return fileWithPreview;
          })
        );

        const updatedFiles = multiple ? [...value, ...newFiles] : newFiles;
        onChange?.(updatedFiles);

        if (onUpload) {
          try {
            await onUpload(newFiles);
            // Update progress to 100% for successfully uploaded files
            const completedFiles = updatedFiles.map((file) => ({
              ...file,
              progress: 100,
            }));
            onChange?.(completedFiles);
          } catch (error) {
            console.error('Upload error:', error);
            // Mark files with error
            const failedFiles = updatedFiles.map((file) => ({
              ...file,
              error: 'Upload failed',
            }));
            onChange?.(failedFiles);
          }
        }
      },
      [disabled, multiple, maxFiles, value, validateFile, preview, onChange, onUpload]
    );

    const handleDragEnter = React.useCallback((e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    }, [disabled]);

    const handleDragLeave = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }, []);

    const handleDragOver = React.useCallback((e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
    }, [disabled]);

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const { files } = e.dataTransfer;
        if (files?.length) {
          processFiles(files);
        }
      },
      [processFiles, disabled]
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files?.length) {
          processFiles(files);
        }
        // Reset the input value so the same file can be uploaded again
        e.target.value = '';
      },
      [processFiles]
    );

    const removeFile = React.useCallback(
      (fileToRemove: FileWithPreview) => {
        if (disabled) return;
        const updatedFiles = value.filter((file) => file !== fileToRemove);
        if (fileToRemove.preview) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
        onChange?.(updatedFiles);
      },
      [value, onChange, disabled]
    );

    // Cleanup preview URLs when component unmounts
    React.useEffect(() => {
      return () => {
        value.forEach(file => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview);
          }
        });
      };
    }, [value]);

    return (
      <div className="space-y-2">
        <div
          className={cn(
            'relative rounded-lg border-2 border-dashed bg-background transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-input hover:border-primary/50',
            error && 'border-destructive',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            ref={ref || inputRef}
            type="file"
            id={inputId}
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center p-4',
              'text-muted-foreground',
              disabled && 'cursor-not-allowed'
            )}
          >
            <DocumentIcon className="mb-2 h-8 w-8" />
            <span className="text-sm">
              {isDragging ? (
                'Drop files here'
              ) : (
                <>
                  Drag and drop files here, or{' '}
                  <span className="text-primary">browse</span>
                </>
              )}
            </span>
            {accept && (
              <span className="mt-1 text-xs text-muted-foreground">
                Accepted file types: {accept}
              </span>
            )}
            {maxSize && (
              <span className="mt-1 text-xs text-muted-foreground">
                Maximum file size: {formatFileSize(maxSize)}
              </span>
            )}
            {multiple && (
              <span className="mt-1 text-xs text-muted-foreground">
                Maximum files: {maxFiles}
              </span>
            )}
          </label>

          {value.length > 0 && (
            <div className="border-t p-2">
              <div className="space-y-2">
                {value.map((file, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-center justify-between rounded-lg bg-muted/50 p-2',
                      file.error && 'bg-destructive/10'
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      {file.preview ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="h-8 w-8 rounded object-cover"
                        />
                      ) : (
                        <DocumentIcon className="h-8 w-8 text-muted-foreground" />
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        {file.error && (
                          <span className="text-xs text-destructive">{file.error}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {typeof file.progress === 'number' && !file.error && (
                        <div className="h-1 w-20 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(file)}
                        disabled={disabled}
                        className={cn(
                          'rounded-full p-1 text-muted-foreground/60 hover:bg-muted hover:text-foreground',
                          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                          disabled && 'cursor-not-allowed opacity-50'
                        )}
                      >
                        <span className="sr-only">Remove {file.name}</span>
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload }; 