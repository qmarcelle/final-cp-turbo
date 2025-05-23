'use client'

import { DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline'
import * as React from 'react';
import { Control, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form'
import { cn } from '../../../utils/cn'

export interface FileWithPreview extends File {
  preview?: string
  error?: string
  progress?: number
}

export interface FileUploadProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  className?: string
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  maxFiles?: number
  preview?: boolean
  validation?: RegisterOptions<TFieldValues>
  onUpload?: (files: File[]) => Promise<void>
  disabled?: boolean
  required?: boolean
  'data-cy'?: string
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export const FileUpload = React.forwardRef<
  HTMLElement,
  FileUploadProps<any>
>(({
    name,
    control,
    label,
    className,
    accept,
    multiple = false,
    maxSize,
    maxFiles = 10,
    preview = true,
    validation,
    onUpload,
    disabled,
    required,
    'data-cy': dataCy,
  }, ref) => {
  const [isDragging, setIsDragging] = useState(false)

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: validation,
  })

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    if (disabled) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (disabled) return
    e.preventDefault()
    e.stopPropagation()
  }, [disabled])

  const validateFile = useCallback(
    (file: File): string | null => {
      if (accept) {
        const acceptedTypes = accept.split(',').map((type) => type.trim())
        const fileType = file.type || `application/${file.name.split('.').pop()}`
        if (!acceptedTypes.some((type) => fileType.match(type))) {
          return `File type ${fileType} is not supported`
        }
      }

      if (maxSize && file.size > maxSize) {
        return `File size exceeds ${formatFileSize(maxSize)}`
      }

      return null
    },
    [accept, maxSize]
  )

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      if (disabled) return

      const fileArray = Array.from(files)
      const currentFiles = (value || []) as FileWithPreview[]
      
      if (multiple && currentFiles.length + fileArray.length > maxFiles) {
        return
      }

      const newFiles: FileWithPreview[] = await Promise.all(
        fileArray.map(async (file) => {
          const error = validateFile(file)
          const fileWithPreview = file as FileWithPreview

          if (!error && preview) {
            try {
              if (file.type.startsWith('image/')) {
                fileWithPreview.preview = URL.createObjectURL(file)
              }
            } catch (e) {
              console.error('Error creating preview:', e)
            }
          }

          fileWithPreview.error = error || undefined
          fileWithPreview.progress = 0

          return fileWithPreview
        })
      )

      const updatedFiles = multiple ? [...currentFiles, ...newFiles] : newFiles
      onChange(updatedFiles)

      if (onUpload) {
        try {
          await onUpload(newFiles)
          // Update progress to 100% for successfully uploaded files
          const completedFiles = updatedFiles.map((file) => ({
            ...file,
            progress: 100,
          }))
          onChange(completedFiles)
        } catch (error) {
          console.error('Upload error:', error)
          // Mark files with error
          const failedFiles = updatedFiles.map((file) => ({
            ...file,
            error: 'Upload failed',
          }))
          onChange(failedFiles)
        }
      }
    },
    [value, onChange, multiple, maxFiles, validateFile, preview, onUpload, disabled]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      if (disabled) return
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const { files } = e.dataTransfer
      if (files?.length) {
        processFiles(files)
      }
    },
    [processFiles, disabled]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target
      if (files?.length) {
        processFiles(files)
      }
      // Reset the input value so the same file can be uploaded again
      e.target.value = ''
    },
    [processFiles]
  )

  const removeFile = useCallback(
    (fileToRemove: FileWithPreview) => {
      if (disabled) return
      const currentFiles = (value || []) as FileWithPreview[]
      const updatedFiles = currentFiles.filter(
        (file) => file !== fileToRemove
      )
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      onChange(updatedFiles)
    },
    [value, onChange, disabled]
  )

  // Cleanup preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      const currentFiles = (value || []) as FileWithPreview[]
      currentFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [value])

  const files = (value || []) as FileWithPreview[]

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200',
            required && 'after:ml-0.5 after:text-red-500 after:content-["*"]',
            disabled && 'opacity-50'
          )}
          data-cy={`${dataCy || name}-label`}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          'relative rounded-lg border-2 border-dashed',
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950'
            : 'border-zinc-950/10 dark:border-white/10',
          'p-4',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-cy={dataCy || name}
      >
        <div className="flex flex-col items-center justify-center">
          <input
            ref={ref}
            type="file"
            id={name}
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            disabled={disabled}
            className="hidden"
            data-cy={`${dataCy || name}-input`}
          />
          <label
            htmlFor={name}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center',
              'text-gray-500 dark:text-gray-400',
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
                  <span className="text-blue-500">browse</span>
                </>
              )}
            </span>
            {accept && (
              <span className="mt-1 text-xs text-gray-500">
                Accepted file types: {accept}
              </span>
            )}
            {maxSize && (
              <span className="mt-1 text-xs text-gray-500">
                Maximum file size: {formatFileSize(maxSize)}
              </span>
            )}
            {multiple && (
              <span className="mt-1 text-xs text-gray-500">
                Maximum files: {maxFiles}
              </span>
            )}
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center justify-between rounded-lg bg-gray-50 p-2',
                  'dark:bg-gray-800',
                  file.error && 'bg-red-50 dark:bg-red-950'
                )}
                data-cy={`${dataCy || name}-file-${index}`}
              >
                <div className="flex items-center space-x-2">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="h-8 w-8 rounded object-cover"
                    />
                  ) : (
                    <DocumentIcon className="h-8 w-8 text-gray-400" />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </span>
                    {file.error && (
                      <span className="text-xs text-red-500">{file.error}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {typeof file.progress === 'number' && !file.error && (
                    <div className="h-1 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(file)}
                    disabled={disabled}
                    className={cn(
                      'rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500',
                      'dark:hover:bg-gray-700',
                      disabled && 'cursor-not-allowed opacity-50'
                    )}
                    data-cy={`${dataCy || name}-remove-${index}`}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error.message}
        </p>
      )}
    </div>
  )
})

FileUpload.displayName = 'FileUpload' 