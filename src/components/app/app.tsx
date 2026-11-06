<<<<<<< HEAD
import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': defaultArticleState.fontFamilyOption.value,
          '--font-size': defaultArticleState.fontSizeOption.value,
          '--font-color': defaultArticleState.fontColor.value,
          '--container-width': defaultArticleState.contentWidth.value,
          '--bg-color': defaultArticleState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm />
      <Article />
    </main>
  );
};
=======
import { useState, CSSProperties } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';
import styles from './app.module.scss';

export const App = () => {
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
		<main className={styles.main} style={cssVariables}>
			<ArticleParamsForm onApply={setArticleSettings} />
			<Article />
		</main>
	);
};
>>>>>>> 02adcc2b586a91a623d67c76f13827f67905352e
