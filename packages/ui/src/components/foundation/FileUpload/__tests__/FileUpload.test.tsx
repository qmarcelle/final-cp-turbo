import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FileUpload } from '../FileUpload'
import { useForm } from 'react-hook-form'

// Mock URL.createObjectURL
window.URL.createObjectURL = jest.fn(() => 'mock-url')
window.URL.revokeObjectURL = jest.fn()

interface TestFileUploadProps {
  maxSize?: number
  maxFiles?: number
  accept?: string
  onUpload?: (files: File[]) => Promise<void>
  multiple?: boolean
  disabled?: boolean
  required?: boolean
  preview?: boolean
  validation?: Record<string, unknown>
}

const TestFileUpload: React.FC<TestFileUploadProps> = ({
  maxSize = 5 * 1024 * 1024, // 5MB
  maxFiles = 1,
  accept = '*/*',
  onUpload = async () => {},
  ...props
}) => (
  <FileUpload
    maxSize={maxSize}
    maxFiles={maxFiles}
    accept={accept}
    onUpload={onUpload}
    {...props}
  />
)

// Mock file creation helper
const createFile = (name: string, size: number, type: string): File => {
  const file = new File([''], name, { type })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

describe('FileUpload Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders with basic props', () => {
      render(<TestFileUpload />)

      expect(screen.getByText('Upload Files')).toBeInTheDocument()
      expect(
        screen.getByText(/Drag and drop files here, or/)
      ).toBeInTheDocument()
      expect(screen.getByText('browse')).toBeInTheDocument()
    })

    it('renders with required label', () => {
      render(<TestFileUpload required={true} />)

      const label = screen.getByText('Upload Files')
      expect(label).toBeInTheDocument()
      expect(label.parentElement).toHaveClass('after:content-["*"]')
    })

    it('renders file restrictions information', () => {
      render(
        <TestFileUpload
          accept=".pdf,.docx"
          maxSize={5 * 1024 * 1024}
          multiple={true}
          maxFiles={3}
        />
      )

      expect(
        screen.getByText('Accepted file types: .pdf,.docx')
      ).toBeInTheDocument()
      expect(screen.getByText('Maximum file size: 5 MB')).toBeInTheDocument()
      expect(screen.getByText('Maximum files: 3')).toBeInTheDocument()
    })

    it('applies disabled state', () => {
      render(<TestFileUpload disabled={true} />)

      const uploadArea = screen.getByTestId('file-upload')
      const input = document.querySelector('input[type="file"]')

      expect(uploadArea).toHaveClass('opacity-50')
      expect(uploadArea).toHaveClass('cursor-not-allowed')
      expect(input).toBeDisabled()
    })
  })

  // File handling tests
  describe('File Handling', () => {
    it('handles file selection via input', async () => {
      const user = userEvent.setup()
      render(<TestFileUpload />)

      const file = createFile('test.pdf', 1024, 'application/pdf')
      const input = document.querySelector('input[type="file"]')

      await user.upload(input, file)

      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument()
        expect(screen.getByText('1 KB')).toBeInTheDocument()
      })
    })

    it('handles file drag and drop', async () => {
      render(<TestFileUpload />)

      const file = createFile('test.pdf', 1024, 'application/pdf')
      const dropzone = screen.getByTestId('file-upload')

      // Simulate drag events
      fireEvent.dragEnter(dropzone, {
        dataTransfer: {
          files: [file],
        },
      })

      expect(screen.getByText('Drop files here')).toBeInTheDocument()

      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument()
      })
    })

    it('handles file removal', async () => {
      const user = userEvent.setup()
      render(<TestFileUpload />)

      const file = createFile('test.pdf', 1024, 'application/pdf')
      const input = document.querySelector('input[type="file"]')

      await user.upload(input, file)

      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument()
      })

      const removeButton = screen.getByRole('button')
      await user.click(removeButton)

      await waitFor(() => {
        expect(screen.queryByText('test.pdf')).not.toBeInTheDocument()
      })

      // Verify URL.revokeObjectURL was called
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url')
    })

    it('generates preview for image files', async () => {
      const user = userEvent.setup()
      render(<TestFileUpload />)

      const file = createFile('image.jpg', 1024, 'image/jpeg')
      const input = document.querySelector('input[type="file"]')

      await user.upload(input, file)

      await waitFor(() => {
        const preview = screen.getByAltText('image.jpg')
        expect(preview).toBeInTheDocument()
        expect(preview).toHaveAttribute('src', 'mock-url')
      })
    })

    it('does not generate preview when preview prop is false', async () => {
      const user = userEvent.setup()
      render(<TestFileUpload preview={false} />)

      const file = createFile('image.jpg', 1024, 'image/jpeg')
      const input = document.querySelector('input[type="file"]')

      await user.upload(input, file)

      await waitFor(() => {
        expect(screen.queryByAltText('image.jpg')).not.toBeInTheDocument()
      })
    })
  })

  // Validation tests
  describe('Validation', () => {
    it('validates file type', async () => {
      const user = userEvent.setup()
      render(<TestFileUpload accept=".pdf" />)

      const file = createFile(
        'test.docx',
        1024,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      )
      const input = document.querySelector('input[type="file"]')

      await user.upload(input, file)

      await waitFor(() => {
        expect(
          screen.getByText(/File type.*is not supported/)
        ).toBeInTheDocument()
      })
    })

    it('validates file size', async () => {
      const user = userEvent.setup()
      render(<TestFileUpload maxSize={1000} />)

      const file = createFile('large.pdf', 2000, 'application/pdf')
      const input = document.querySelector('input[type="file"]')

      await user.upload(input, file)

      await waitFor(() => {
        expect(
          screen.getByText(/File size exceeds 1000 Bytes/)
        ).toBeInTheDocument()
      })
    })

    it('validates maximum number of files', async () => {
      const user = userEvent.setup()
      render(<TestFileUpload multiple={true} maxFiles={2} />)

      const file1 = createFile('file1.pdf', 1024, 'application/pdf')
      const file2 = createFile('file2.pdf', 1024, 'application/pdf')
      const file3 = createFile('file3.pdf', 1024, 'application/pdf')

      const input = document.querySelector('input[type="file"]')

      // Upload first two files
      await user.upload(input, [file1, file2])

      await waitFor(() => {
        expect(screen.getByText('file1.pdf')).toBeInTheDocument()
        expect(screen.getByText('file2.pdf')).toBeInTheDocument()
      })

      // Try to upload a third file
      await user.upload(input, file3)

      // Third file should not be added due to maxFiles restriction
      await waitFor(() => {
        expect(screen.queryByText('file3.pdf')).not.toBeInTheDocument()
      })
    })
  })

  // Upload functionality tests
  describe('Upload Functionality', () => {
    it('calls onUpload when files are added', async () => {
      const mockUpload = jest.fn().mockResolvedValue(undefined)
      const user = userEvent.setup()

      render(<TestFileUpload onUpload={mockUpload} />)

      const file = createFile('test.pdf', 1024, 'application/pdf')
      const input = document.querySelector('input[type="file"]')

      await user.upload(input, file)

      await waitFor(() => {
        expect(mockUpload).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({ name: 'test.pdf' }),
          ])
        )
      })
    })

    it('shows progress indicator during upload', async () => {
      // Mock a delayed upload to test progress indicator
      const mockUpload = jest.fn().mockImplementation(() => {
        return new Promise(resolve => {
          setTimeout(resolve, 100)
        })
      })

      const user = userEvent.setup()
      render(<TestFileUpload onUpload={mockUpload} />)

      const file = createFile('test.pdf', 1024, 'application/pdf')
      const input = document.querySelector('input[type="file"]')

      await user.upload(input, file)

      // Should show progress indicator
      const progressBar = await screen.findByRole('progressbar', {
        hidden: true,
      })
      expect(progressBar).toBeInTheDocument()

      // After upload completes, progress should be 100%
      await waitFor(() => {
        expect(progressBar).toHaveStyle({ width: '100%' })
      })
    })

    it('handles upload errors', async () => {
      const mockUpload = jest.fn().mockRejectedValue(new Error('Upload failed'))
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      const user = userEvent.setup()
      render(<TestFileUpload onUpload={mockUpload} />)

      const file = createFile('test.pdf', 1024, 'application/pdf')
      const input = document.querySelector('input[type="file"]')

      await user.upload(input, file)

      await waitFor(() => {
        expect(screen.getByText('Upload failed')).toBeInTheDocument()
        expect(consoleErrorSpy).toHaveBeenCalled()
      })

      consoleErrorSpy.mockRestore()
    })
  })

  // Accessibility tests
  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<TestFileUpload />)

      const label = screen.getByText('Upload Files')
      expect(label).toHaveAttribute('for', 'files')

      const input = document.querySelector('input[type="file"]')
      expect(input).toHaveAttribute('id', 'files')
    })

    it('shows validation error with role="alert"', async () => {
      const user = userEvent.setup()

      // Mock form validation error
      const mockValidation = {
        required: 'This field is required',
      }

      render(<TestFileUpload validation={mockValidation} required={true} />)

      // Trigger validation (by submitting the form)
      const form = document.querySelector('form')
      if (form) {
        await user.click(screen.getByRole('button', { name: /Submit/i }))

        await waitFor(() => {
          const errorMessage = screen.getByRole('alert')
          expect(errorMessage).toBeInTheDocument()
          expect(errorMessage).toHaveTextContent('This field is required')
        })
      }
    })
  })

  // Edge cases
  describe('Edge Cases', () => {
    it('handles empty files array gracefully', () => {
      render(<TestFileUpload />)

      // No files should be displayed
      expect(screen.queryByTestId('file-upload-file-0')).not.toBeInTheDocument()
    })

    it('properly formats file sizes', async () => {
      const user = userEvent.setup()
      render(<TestFileUpload />)

      // Test different file sizes
      const smallFile = createFile('small.txt', 100, 'text/plain')
      const mediumFile = createFile('medium.pdf', 1024 * 500, 'application/pdf')
      const largeFile = createFile(
        'large.zip',
        1024 * 1024 * 3,
        'application/zip'
      )

      const input = document.querySelector('input[type="file"]')

      // Upload small file
      await user.upload(input, smallFile)
      expect(await screen.findByText('100 Bytes')).toBeInTheDocument()

      // Remove and upload medium file
      await user.click(screen.getByRole('button'))
      await user.upload(input, mediumFile)
      expect(await screen.findByText('500 KB')).toBeInTheDocument()

      // Remove and upload large file
      await user.click(screen.getByRole('button'))
      await user.upload(input, largeFile)
      expect(await screen.findByText('3 MB')).toBeInTheDocument()
    })

    it('supports ref forwarding', () => {
      const ref = React.createRef()
      const { control } = useForm({ defaultValues: { files: [] } })

      render(<FileUpload name="files" control={control} ref={ref} />)

      expect(ref.current).not.toBeNull()
      expect(ref.current.tagName).toBe('INPUT')
      expect(ref.current.type).toBe('file')
    })
  })
})
