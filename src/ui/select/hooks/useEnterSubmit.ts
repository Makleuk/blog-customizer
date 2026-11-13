import { useEffect } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';

type UseEnterSubmit = {
  onChange: Dispatch<SetStateAction<boolean>>;
  placeholderRef: RefObject<HTMLDivElement | null>;
};

export const useEnterSubmit = ({ placeholderRef, onChange }: UseEnterSubmit): void => {
  useEffect((): (() => void) | undefined => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) {
      return;
    }

    const handleEnterKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        onChange((isOpen: boolean) => !isOpen);
      }
    };

    placeholderEl.addEventListener('keydown', handleEnterKeyDown);

    return (): void => {
      placeholderEl.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, [onChange, placeholderRef]);
};
