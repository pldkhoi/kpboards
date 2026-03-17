// form
import { Controller, useFormContext } from 'react-hook-form';

// type
import {
  UploadAvatar,
  UploadMultiFile,
  UploadSingleFile,
  type UploadMultiFileProps,
  type UploadProps,
} from '@/components/upload';

// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, 'file'> {
  name: string;
}

export function RHFUploadAvatar({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <div>
            <UploadAvatar error={checkError} {...other} file={field.value} />
            {checkError && (
              <p className="mt-1 px-2 text-center text-sm text-destructive">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadSingleFile({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <UploadSingleFile
            accept={{ 'image/*': [] }}
            file={field.value}
            error={checkError}
            helperText={
              checkError ? (
                <p className="mt-1 px-2 text-sm text-destructive">{error.message}</p>
              ) : undefined
            }
            {...other}
          />
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

interface RHFUploadMultiFileProps extends Omit<UploadMultiFileProps, 'files'> {
  name: string;
}

export function RHFUploadMultiFile({ name, ...other }: RHFUploadMultiFileProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (
          <UploadMultiFile
            accept={{ 'image/*': [] }}
            files={field.value}
            error={checkError}
            helperText={
              checkError ? (
                <p className="mt-1 px-2 text-sm text-destructive">{error.message}</p>
              ) : undefined
            }
            {...other}
          />
        );
      }}
    />
  );
}
