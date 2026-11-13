import { useEffect } from 'react';
import type { RefObject } from 'react';

type UseOutsideClickClose = {
  isOpen: boolean;
  onChange: (newValue: boolean) => void;
  onClose?: () => void;
  rootRef: RefObject<HTMLDivElement | null>;
};

export const useOutsideClickClose = ({
  isOpen,
  rootRef,
  onClose,
  onChange,
}: UseOutsideClickClose): void => {
  useEffect((): (() => void) | undefined => {
    if (!isOpen) {
      return;
    }

    const handleClick = (event: MouseEvent): void => {
      const { target } = event;

      if (target instanceof Node && !rootRef.current?.contains(target)) {
        onClose?.();
        onChange(false);
      }
    };

    window.addEventListener('mousedown', handleClick);

    return (): void => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onChange, onClose, rootRef]);
};

