import { useDropzone } from 'react-dropzone';
// type
import Image from '@/components/image';
import { type UploadProps } from './type';
//
import { cn } from '@/lib/utils';
import BlockContent from './block-content';
import RejectionFiles from './rejection-files';

// ----------------------------------------------------------------------

export default function UploadSingleFile({
  error = false,
  file,
  helperText,
  sx,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  });

  return (
    <div className="w-full" style={sx}>
      <div
        {...getRootProps()}
        className={cn(
          'relative z-0 flex overflow-hidden rounded-lg border border-border bg-muted/50 p-4 outline-none transition-opacity hover:cursor-pointer hover:opacity-70',
          isDragActive && 'opacity-70',
          (isDragReject || error) && 'border-destructive/50 bg-destructive/10 text-destructive',
          file && 'p-2'
        )}
      >
        <input {...getInputProps()} />

        {!file && <BlockContent />}

        {file && (
          <Image
            alt="file preview"
            src={typeof file === 'string' ? file : file.preview}
            ratio="1/1"
          />
        )}
        <div
          className={cn(
            'absolute inset-2 flex flex-col items-center justify-center rounded-md bg-muted text-muted-foreground transition-opacity',
            file && 'inset-0 bg-black/50 text-white opacity-0 hover:opacity-100',
            (isDragReject || error) && 'bg-destructive/10'
          )}
        >
          <span className="z-10 rounded bg-muted px-4 py-1 text-sm text-foreground">
            {file ? 'Change photo' : 'Upload photo'}
          </span>
        </div>
      </div>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {helperText && helperText}
    </div>
  );
}
