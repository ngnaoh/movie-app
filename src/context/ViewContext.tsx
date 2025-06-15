import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type ViewType = "grid" | "list";

interface ViewContextType {
  view: ViewType;
  toggleView: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [view, setView] = useState<ViewType>(() => {
    const savedView = localStorage.getItem("view-mode");
    return (savedView as ViewType) || "grid";
  });

  const toggleView = () => {
    setView((prev) => {
      const newView = prev === "grid" ? "list" : "grid";
      localStorage.setItem("view-mode", newView);
      return newView;
    });
  };

  return (
    <ViewContext.Provider value={{ view, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
};
