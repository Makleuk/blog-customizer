import { clsx } from 'clsx';
import { useState } from 'react';

import { defaultArticleState } from '../../constants/articleProps';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';

import type { ArticleStateType } from '../../constants/articleProps';
import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [articleSettings, setArticleSettings] =
    useState<ArticleStateType>(defaultArticleState);

  const cssVariables = {
    '--font-family': articleSettings.fontFamilyOption.value,
    '--font-size': articleSettings.fontSizeOption.value,
    '--font-color': articleSettings.fontColor.value,
    '--container-width': articleSettings.contentWidth.value,
    '--bg-color': articleSettings.backgroundColor.value,
  } as CSSProperties;

  return (
    <main className={clsx(styles.main)} style={cssVariables}>
      <ArticleParamsForm onApply={setArticleSettings} />
      <Article />
    </main>
  );
};

