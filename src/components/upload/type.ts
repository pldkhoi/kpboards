import { type ReactNode } from 'react';
import { type DropzoneOptions } from 'react-dropzone';

// ----------------------------------------------------------------------

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  file: CustomFile | string | null;
  helperText?: ReactNode;
  sx?: React.CSSProperties;
}

export interface UploadMultiFileProps extends DropzoneOptions {
  files: (File | string)[];
  error?: boolean;
  showPreview?: boolean;
  sx?: React.CSSProperties;
  helperText?: ReactNode;
  onUpload?: VoidFunction;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: VoidFunction;
}
