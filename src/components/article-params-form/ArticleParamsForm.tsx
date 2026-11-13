import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent } from 'react';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formSettings, setFormSettings] =
    useState<ArticleStateType>(defaultArticleState);

  const sidebarRef = useRef<HTMLElement>(null);

  const handleFieldChange =
    (field: keyof ArticleStateType): ((option: OptionType) => void) =>
    (option: OptionType): void => {
      setFormSettings((prev) => ({ ...prev, [field]: option }));
    };

  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent): void => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    onApply(formSettings);
    setIsSidebarOpen(false);
  };

  const handleReset = (): void => {
    setFormSettings(defaultArticleState);
    onApply(defaultArticleState);
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isSidebarOpen,
        })}
        ref={sidebarRef}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Text as="h2" size={31} weight={800} uppercase>
            ЗАДАЙТЕ ПАРАМЕТРЫ
          </Text>

          <Select
            title="ШРИФТ"
            options={fontFamilyOptions}
            selected={formSettings.fontFamilyOption}
            onChange={handleFieldChange('fontFamilyOption')}
          />

          <RadioGroup
            title="РАЗМЕР ШРИФТА"
            name="fontSize"
            options={fontSizeOptions}
            selected={formSettings.fontSizeOption}
            onChange={handleFieldChange('fontSizeOption')}
          />

          <Select
            title="ЦВЕТ ШРИФТА"
            options={fontColors}
            selected={formSettings.fontColor}
            onChange={handleFieldChange('fontColor')}
          />

          <Separator />

          <Select
            title="ЦВЕТ ФОНА"
            options={backgroundColors}
            selected={formSettings.backgroundColor}
            onChange={handleFieldChange('backgroundColor')}
          />

          <Select
            title="ШИРИНА КОНТЕНТА"
            options={contentWidthArr}
            selected={formSettings.contentWidth}
            onChange={handleFieldChange('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button
              title="СБРОСИТЬ"
              htmlType="reset"
              type="clear"
              onClick={handleReset}
            />
            <Button title="ПРИМЕНИТЬ" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
