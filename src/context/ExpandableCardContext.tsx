import React, { createContext, useContext, useState, ReactNode } from "react";

interface ExpandableCardContextType {
  expandedCardId: string | null;
  setExpandedCardId: (id: string | null) => void;
}

const ExpandableCardContext = createContext<ExpandableCardContextType | undefined>(undefined);

export const ExpandableCardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  return (
    <ExpandableCardContext.Provider value={{ expandedCardId, setExpandedCardId }}>
      {children}
    </ExpandableCardContext.Provider>
  );
};

export const useExpandableCard = () => {
  const context = useContext(ExpandableCardContext);
  if (!context) {
    throw new Error("useExpandableCard must be used within ExpandableCardProvider");
  }
  return context;
};
