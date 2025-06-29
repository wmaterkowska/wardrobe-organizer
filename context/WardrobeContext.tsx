import React, { createContext, useContext, useState } from 'react';

export type ViewType = 'list' | 'grid';
export type NumColumns = 1 | 2 | 3 | 4;

interface WardrobeContextProps {
  viewType: ViewType;
  setViewType: React.Dispatch<React.SetStateAction<ViewType>>;
  numColumns: NumColumns;
  setNumColumns: React.Dispatch<React.SetStateAction<NumColumns>>;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  saveChanges: () => void;
  isFilter: boolean;
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectMode: boolean;
  setIsSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  deleteItems: () => void;
  triggerDelete: () => void;
}

const WardrobeContext = createContext<WardrobeContextProps | undefined>(undefined);

export const useWardrobeContext = () => {
  const context = useContext(WardrobeContext);
  if (!context) throw new Error('WardrobeContext must be used within WardrobeProvider');
  return context;
};

export const WardrobeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [numColumns, setNumColumns] = useState<NumColumns>(2);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [saveCallback, setSaveCallback] = useState<() => void>(() => () => {});
  const [deleteCallback, setDeleteCallback] = useState<() => void>(() => () => {});

  return (
    <WardrobeContext.Provider
      value={{
        viewType,
        setViewType,
        numColumns,
        setNumColumns,
        isEditMode,
        setIsEditMode,
        saveChanges: (fn: () => void) => setSaveCallback(() => fn),
        isFilter,
        setIsFilter,
        isSelectMode,
        setIsSelectMode,
        selectedItems,
        setSelectedItems,
        deleteItems: (fn: () => void) => setDeleteCallback(() => fn),
        triggerDelete: deleteCallback,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
};

export const useRegisterSave = (saveFn: () => void) => {
  const ctx = useWardrobeContext();

  React.useEffect(() => {
    if (ctx && ctx.saveChanges) {
      ctx.saveChanges(saveFn);
    }
  }, [saveFn, ctx]);
};

export const useRegisterDelete = (deleteFn: () => void) => {
  const ctx = useWardrobeContext();

  React.useEffect(() => {
    if (ctx && ctx.deleteItems) {
      ctx.deleteItems(deleteFn);
    }
  }, [deleteFn, ctx]);
};