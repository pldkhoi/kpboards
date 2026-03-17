import { AnimatePresence, m } from 'framer-motion';
// components
import { Iconify, Image } from '@/components';
import { varFade } from '@/components/animate';
import { Button } from '@/components/ui/button';
// utils
import { fData } from '@/utils/format-number';
import getFileData from '@/utils/get-file-data';
// type
import { cn } from '@/lib/utils';
import { type UploadMultiFileProps } from './type';

// ----------------------------------------------------------------------

export default function MultiFilePreview({
  showPreview = false,
  files,
  onRemove,
}: UploadMultiFileProps) {
  const hasFile = files.length > 0;

  return (
    <ul className={cn('list-none p-0 m-0', hasFile && 'my-3')}>
      <AnimatePresence>
        {files.map((file, index) => {
          const { key, name, size, preview } = getFileData(file, index);

          if (showPreview) {
            return (
              <m.li
                key={key}
                {...varFade().inRight}
                className="relative m-1 inline-flex h-20 w-20 overflow-hidden rounded-md border border-border"
              >
                <Image alt="preview" src={preview} ratio="1/1" />

                {onRemove && (
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => onRemove(file)}
                    className="absolute right-2 top-2 size-6 rounded-full bg-black/70 p-0.5 text-white hover:bg-black/50"
                  >
                    <Iconify icon="eva:close-fill" width={14} height={14} />
                  </Button>
                )}
              </m.li>
            );
          }

          return (
            <m.li
              key={key}
              {...varFade().inRight}
              className="flex items-center gap-2 rounded-md border border-border px-4 py-1.5"
            >
              <Iconify icon="eva:file-fill" className="size-7 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {typeof file === 'string' ? file : name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {typeof file === 'string' ? '' : fData(size || 0)}
                </p>
              </div>
              {onRemove && (
                <Button
                  size="icon-xs"
                  variant="ghost"
                  onClick={() => onRemove(file)}
                  className="shrink-0"
                >
                  <Iconify icon="eva:close-fill" width={16} height={16} />
                </Button>
              )}
            </m.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}
