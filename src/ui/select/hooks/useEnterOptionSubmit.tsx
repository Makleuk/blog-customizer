import { useEffect } from 'react';

import type { RefObject } from 'react';
import type { OptionType } from 'src/constants/articleProps';

type UseEnterOptionSubmit = {
  onClick: (value: OptionType['value']) => void;
  value: OptionType['value'];
  optionRef: RefObject<HTMLLIElement | null>;
};

export const useEnterOptionSubmit = ({
  onClick,
  value,
  optionRef,
}: UseEnterOptionSubmit): void => {
  useEffect((): (() => void) | undefined => {
    const option = optionRef.current;
    if (!option) return;

    const handleEnterKeyDown = (event: KeyboardEvent): void => {
      if (document.activeElement === option && event.key === 'Enter') {
        onClick(value);
      }
    };

    option.addEventListener('keydown', handleEnterKeyDown);

    return (): void => {
      option.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, [value, onClick, optionRef]);
};
