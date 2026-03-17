import { useDropzone } from 'react-dropzone';
//
import { Button } from '@/components/ui/button';
import BlockContent from './block-content';
import MultiFilePreview from './multi-file-preview';
import RejectionFiles from './rejection-files';
// type
import { cn } from '@/lib/utils';
import { type UploadMultiFileProps } from './type';

// ----------------------------------------------------------------------

export default function UploadMultiFile({
  error,
  showPreview = false,
  files,
  onUpload,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  ...other
}: UploadMultiFileProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    ...other,
  });

  return (
    <div className="w-full" style={sx}>
      <div
        {...getRootProps()}
        className={cn(
          'cursor-pointer rounded-lg border border-dashed border-border bg-muted p-4 outline-none transition-opacity hover:opacity-70',
          (isDragActive && 'opacity-70') ||
            ((isDragReject || error) && 'border-destructive/50 bg-destructive/10 text-destructive')
        )}
      >
        <input {...getInputProps()} />

        <BlockContent />
      </div>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      <MultiFilePreview files={files} showPreview={showPreview} onRemove={onRemove} />

      {files.length > 0 && (
        <div className="mt-3 flex flex-row justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button size="sm" onClick={onUpload}>
            Upload files
          </Button>
        </div>
      )}

      {helperText && helperText}
    </div>
  );
}
