//
import { Iconify, MenuPopover } from '@/components';
import { IconButtonAnimate } from '@/components/animate';

// ----------------------------------------------------------------------

type Props = {
  actions: React.ReactNode;
  open?: HTMLElement | null;
  onClose?: VoidFunction;
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function TableMoreMenu({ actions, open, onClose, onOpen }: Props) {
  return (
    <>
      <IconButtonAnimate onClick={onOpen}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButtonAnimate>

      <MenuPopover open={Boolean(open)} anchorEl={open} onClose={onClose} className="w-40">
        {actions}
      </MenuPopover>
    </>
  );
}
