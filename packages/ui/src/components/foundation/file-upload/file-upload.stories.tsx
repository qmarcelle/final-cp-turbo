import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload, type FileUploadProps, type FileWithPreview } from './file-upload'
import { useForm, FormProvider, Control } from 'react-hook-form'

// Define a specific type for form values used in stories
interface StoryFormValues {
  storyFileField: FileWithPreview[] | null;
}

const meta = {
  title: 'Foundation/file-upload',
  component: FileUpload as React.FC<FileUploadProps<StoryFormValues>>,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A file upload component that supports single or multiple file uploads, drag and drop, and validation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'Form field name', defaultValue: 'storyFileField' },
    label: { control: 'text' },
    accept: { control: 'text', description: 'Comma-separated string of accepted file types (e.g., "image/png,application/pdf")' },
    maxSize: { control: 'number', description: 'Max file size in bytes' },
    multiple: { control: 'boolean' },
    maxFiles: { control: 'number' },
    preview: { control: 'boolean', description: 'Show image previews for image files' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    onUpload: { action: 'uploaded', description: 'Callback when files are selected/dropped and validated' },
    control: { table: { disable: true } },
    className: { control: 'text' },
  },
} satisfies Meta<FileUploadProps<StoryFormValues>>;

export default meta;

interface FileUploadStoryArgs extends Partial<FileUploadProps<StoryFormValues>> {
  initialValue?: FileWithPreview[] | null;
  storyTitle?: string;
  description?: string;
  // name must be a key of StoryFormValues
  name: keyof StoryFormValues;
}

type Story = StoryObj<FileUploadStoryArgs>;

// Wrapper to provide form context for stories
const FormWrapper = (args: FileUploadStoryArgs & { children: (control: Control<StoryFormValues>) => React.ReactNode }) => {
  const methods = useForm<StoryFormValues>({ 
    defaultValues: { [args.name]: args.initialValue || null } 
  });
  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-lg p-4">
        {args.storyTitle && <h3 className="text-lg font-medium mb-2">{args.storyTitle}</h3>}
        {args.children(methods.control)}
        {args.description && <p className="text-sm text-gray-600 mt-2">{args.description}</p>}
      </div>
    </FormProvider>
  );
};

export const Default: Story = {
  args: {
    name: 'storyFileField',
    label: 'Upload Files',
    initialValue: [],
    onUpload: async (files: File[]) => { console.log('Default - Selected files:', files); },
    storyTitle: 'Default File Upload',
    description: 'Basic file upload with no restrictions.',
  },
  render: (args) => <FormWrapper {...args}>{ (control) => <FileUpload {...args} control={control} /> }</FormWrapper>,
};

export const WithAcceptedTypes: Story = {
  args: {
    name: 'storyFileField',
    label: 'Upload Images (JPG/PNG)',
    accept: 'image/jpeg,image/png',
    initialValue: [],
    onUpload: async (files: File[]) => { console.log('AcceptedTypes - Selected files:', files); },
    storyTitle: 'Accepted File Types',
    description: 'Only JPEG and PNG images are allowed.',
  },
  render: (args) => <FormWrapper {...args}>{ (control) => <FileUpload {...args} control={control} /> }</FormWrapper>,
};

export const WithMaxSize: Story = {
  args: {
    name: 'storyFileField',
    label: 'Upload File (Max 1MB)',
    maxSize: 1 * 1024 * 1024, // 1MB
    initialValue: [],
    onUpload: async (files: File[]) => { console.log('MaxSize - Selected files:', files); },
    storyTitle: 'Maximum File Size',
    description: 'Files larger than 1MB will be rejected.',
  },
  render: (args) => <FormWrapper {...args}>{ (control) => <FileUpload {...args} control={control} /> }</FormWrapper>,
};

export const MultipleFiles: Story = {
  args: {
    name: 'storyFileField',
    label: 'Upload Multiple Files (Max 3)',
    multiple: true,
    maxFiles: 3,
    initialValue: [],
    onUpload: async (files: File[]) => { console.log('MultipleFiles - Selected files:', files); },
    storyTitle: 'Multiple File Upload',
    description: 'Allows uploading up to 3 files at once.',
  },
  render: (args) => <FormWrapper {...args}>{ (control) => <FileUpload {...args} control={control} /> }</FormWrapper>,
};

const sampleImageFile = new File(['sample'], 'example.jpg', { type: 'image/jpeg' });
const samplePdfFile = new File(['samplepdf'], 'document.pdf', { type: 'application/pdf' });

export const WithPreview: Story = {
  args: {
    name: 'storyFileField',
    label: 'Upload with Preview',
    preview: true,
    multiple: true,
    initialValue: [
      { ...sampleImageFile, preview: URL.createObjectURL(sampleImageFile) } as FileWithPreview,
      { ...samplePdfFile } as FileWithPreview, // PDF won't have image preview by default
    ],
    onUpload: async (files: File[]) => { console.log('WithPreview - Selected files:', files); },
    storyTitle: 'File Upload with Previews',
    description: 'Shows image previews for image files. Other files show a generic icon.',
  },
  render: (args) => <FormWrapper {...args}>{ (control) => <FileUpload {...args} control={control} /> }</FormWrapper>,
  play: async ({ args }) => {
    // Clean up object URLs after story is rendered if needed, though component should handle it
    args.initialValue?.forEach((f: FileWithPreview) => f.preview && URL.revokeObjectURL(f.preview));
  }
};

export const WithValidationRules: Story = {
  args: {
    name: 'storyFileField',
    label: 'Upload (Max 1MB, Images only)',
    accept: 'image/png,image/jpeg,image/gif',
    maxSize: 1 * 1024 * 1024, // 1MB
    required: true,
    validation: {
      required: 'At least one file is required.',
      validate: (value: FileWithPreview[] | null) => {
        if (value && value.length > 0 && value.some(f => f.error)) {
          return 'One or more files have errors.';
        }
        return true;
      }
    },
    onUpload: async (files: File[]) => console.log('WithValidation - Selected files:', files),
    storyTitle: 'Upload with Validation Rules',
    description: 'Requires an image file under 1MB. Errors will be shown by the component based on validation.',
  },
  render: (args) => <FormWrapper {...args}>{ (control) => <FileUpload {...args} control={control} /> }</FormWrapper>,
};

export const Disabled: Story = {
  args: {
    name: 'storyFileField',
    label: 'File Upload (Disabled)',
    disabled: true,
    initialValue: [],
    onUpload: async (files: File[]) => console.log('Disabled - Should not fire:', files),
    storyTitle: 'Disabled File Upload',
    description: 'The file upload component is disabled and cannot be interacted with.',
  },
  render: (args) => <FormWrapper {...args}>{ (control) => <FileUpload {...args} control={control} /> }</FormWrapper>,
};

export const CustomStyled: Story = {
  args: {
    name: 'storyFileField',
    label: 'Custom Styled Upload Area',
    className: 'border-sky-500 bg-sky-50 dark:bg-sky-900', // Component internals handle some classes, this can add more
    onUpload: async (files: File[]) => console.log('CustomStyled - Selected files:', files),
    storyTitle: 'Custom Styling',
    description: 'File upload area with additional custom Tailwind CSS classes for styling the outer div.',
  },
  render: (args) => <FormWrapper {...args}>{ (control) => <FileUpload {...args} control={control} /> }</FormWrapper>,
}; 