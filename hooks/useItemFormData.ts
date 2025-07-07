import Realm from 'realm';
import { useQuery } from '@realm/react';

export const useItemFormData = () => {
  const mains = useQuery('MainCategory');
  const categories = useQuery('Category');
  const colors = useQuery('Color');
  const patterns = useQuery('Pattern');
  const fits = useQuery('Fit');
  const cuts = useQuery('Cut');
  const textiles = useQuery('Textile');
  const occasions = useQuery('Occasion');
  const feels = useQuery('FeelIn');

  return { mains, categories, colors, patterns, fits, cuts, textiles, occasions, feels };
};
