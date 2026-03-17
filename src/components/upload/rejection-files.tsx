import { type FileRejection } from 'react-dropzone';
// utils
import { fData } from '@/utils/format-number';
import getFileData from '@/utils/get-file-data';

// ----------------------------------------------------------------------

type Props = {
  fileRejections: FileRejection[];
};

export default function RejectionFiles({ fileRejections }: Props) {
  return (
    <div className="mt-3 rounded border border-destructive/30 bg-destructive/10 px-4 py-2">
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = getFileData(file);

        return (
          <div key={path} className="my-2">
            <p className="truncate text-sm font-semibold">
              {path} - {size ? fData(size) : ''}
            </p>

            {errors.map((error) => (
              <li key={error.code} className="text-xs text-muted-foreground">
                {error.message}
              </li>
            ))}
          </div>
        );
      })}
    </div>
  );
}
