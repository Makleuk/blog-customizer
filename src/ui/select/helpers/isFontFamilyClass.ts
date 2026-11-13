import { fontFamilyClasses } from 'src/constants/articleProps';
import type { FontFamiliesClasses } from 'src/constants/articleProps';

export function isFontFamilyClass(
  family?: string
): family is FontFamiliesClasses {
  return fontFamilyClasses.includes(family as FontFamiliesClasses);
}
