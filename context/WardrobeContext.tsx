import React, { createContext, useContext, useState } from 'react';

type ViewType = 'list' | 'grid';
type NumColumns = 1 | 2 | 3 | 4;

interface WardrobeContextProps {
  viewType: ViewType;
  setViewType: React.Dispatch<React.SetStateAction<ViewType>>;
  numColumns: NumColumns;
  setNumColumns: React.Dispatch<React.SetStateAction<NumColumns>>;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  saveChanges: () => void;
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

  const [saveCallback, setSaveCallback] = useState<() => void>(() => () => {});
  const saveChanges = () => saveCallback();

  return (
    <WardrobeContext.Provider
      value={{
        viewType,
        setViewType,
        numColumns,
        setNumColumns,
        isEditMode,
        setIsEditMode,
        saveChanges,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
};

export const useRegisterSave = (saveFn: () => void) => {
  const ctx = useWardrobeContext();
  React.useEffect(() => {
    ctx && ctx.saveChanges && ctx.saveChanges;
  }, [saveFn]);
};