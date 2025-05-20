import { useState } from 'react';

export function useExpandableList<T>(items: T[], limit: number = 30) {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? items : items.slice(0, limit);
  const showToggle = items.length > limit;

  return {
    visibleItems,
    expanded,
    toggle: () => setExpanded((prev) => !prev),
    showToggle,
  };
}
