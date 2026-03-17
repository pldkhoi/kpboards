import { useDropzone } from 'react-dropzone';
//
import { Iconify, Image } from '@/components';
import { cn } from '@/lib/utils';
import RejectionFiles from './rejection-files';
import { type UploadProps } from './type';

// ----------------------------------------------------------------------

export default function UploadAvatar({ error, file, helperText, sx, ...other }: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  });

  return (
    <>
      <div
        className={cn(
          'mx-auto size-36 rounded-full border border-dashed border-border p-2',
          (isDragReject || error) && 'border-destructive/50'
        )}
        style={sx}
      >
        <div
          {...getRootProps()}
          className={cn(
            'relative flex size-full cursor-pointer items-center justify-center overflow-hidden rounded-full outline-none',
            isDragActive && 'opacity-70'
          )}
        >
          <input {...getInputProps()} />

          {file && (
            <Image
              alt="avatar"
              src={typeof file === 'string' ? file : file.preview}
              className="relative z-[8]"
            />
          )}

          <div
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center rounded-full bg-muted text-muted-foreground transition-opacity hover:opacity-70',
              file && 'opacity-0 text-white hover:opacity-70',
              (isDragReject || error) && 'bg-destructive/10'
            )}
          >
            <Iconify icon="ic:round-add-a-photo" className="mb-1 size-6" />
            <span className="text-xs">{file ? 'Update photo' : 'Upload photo'}</span>
          </div>
        </div>
      </div>

      {helperText && helperText}

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
    </>
  );
}
