import { DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useController, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { FileWithPreview } from '../types'

export interface FileUploadProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  className?: string
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  maxFiles?: number
  preview?: boolean
  validation?: RegisterOptions<T>
  onUpload?: (files: File[]) => Promise<void>
  'data-cy'?: string
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export const FileUpload = forwardRef(function FileUpload<T extends FieldValues>({
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
  'data-cy': dataCy,
}: FileUploadProps<T>, ref: React.ForwardedRef<HTMLInputElement>) {
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
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

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
    [value, onChange, multiple, maxFiles, validateFile, preview, onUpload]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const { files } = e.dataTransfer
      if (files?.length) {
        processFiles(files)
      }
    },
    [processFiles]
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
      const currentFiles = (value || []) as FileWithPreview[]
      const updatedFiles = currentFiles.filter(
        (file) => file !== fileToRemove
      )
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      onChange(updatedFiles)
    },
    [value, onChange]
  )

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
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
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
          data-cy={`${dataCy || name}-label`}
        >
          {label}
        </label>
      )}
      <div
        className={clsx(
          'relative rounded-lg border-2 border-dashed',
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950'
            : 'border-zinc-950/10 dark:border-white/10',
          'p-4',
          className
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-cy={dataCy || name}
      >
        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            id={name}
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            className="hidden"
            ref={ref}
          />
          <label
            htmlFor={name}
            className={clsx(
              'flex cursor-pointer flex-col items-center justify-center',
              'text-gray-500 dark:text-gray-400'
            )}
          >
            <DocumentIcon className="mb-2 h-8 w-8" />
            <span className="text-sm">
              {isDragging ? (
                'Drop files here'
              ) : (
                <>
                  Drag and drop files here, or{' '}
                  <span className="text-blue-500 dark:text-blue-400">browse</span>
                </>
              )}
            </span>
            {(accept || maxSize) && (
              <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                {accept && `Accepted files: ${accept}`}
                {accept && maxSize && ' · '}
                {maxSize && `Max size: ${formatFileSize(maxSize)}`}
              </span>
            )}
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className={clsx(
                  'relative rounded-lg border',
                  file.error
                    ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
                    : 'border-zinc-950/10 bg-white dark:border-white/10 dark:bg-white/5',
                  'p-3'
                )}
                data-cy={`${dataCy || name}-file-${index}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {preview && file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    ) : (
                      <DocumentIcon className="h-10 w-10 text-gray-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.progress !== undefined && !file.error && (
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300 dark:bg-blue-400"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(file)}
                      className="rounded-lg p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                      data-cy={`${dataCy || name}-remove-${index}`}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {file.error && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {file.error}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p
          className="mt-2 text-sm text-red-600 dark:text-red-500"
          data-cy={`${dataCy || name}-error`}
        >
          {error.message}
        </p>
      )}
    </div>
  )
})

FileUpload.displayName = 'FileUpload' 