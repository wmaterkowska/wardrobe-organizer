import { usePropertyManager } from './usePropertyManager';
import { Category, Color, Pattern, Fit, Cut, Textile, Occasion, FeelIn } from '../database/index';

export const useAllPropertyManagers = () => {
  const category = usePropertyManager<Category>('Category');
  const color = usePropertyManager<Color>('Color');
  const pattern = usePropertyManager<Pattern>('Pattern');
  const fit = usePropertyManager<Fit>('Fit');
  const cut = usePropertyManager<Cut>('Cut');
  const textile = usePropertyManager<Textile>('Textile');
  const occasion = usePropertyManager<Occasion>('Occasion');
  const feels = usePropertyManager<FeelIn>('FeelIn');

  return {
    category,
    color,
    pattern,
    fit,
    cut,
    textile,
    occasion,
    feels,
  };
};
