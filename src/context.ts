import { createContext, useContext } from "react";
export const AppContext = createContext<{
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  storeName: string;
  hasSetup: boolean;
  setHasSetup: React.Dispatch<React.SetStateAction<boolean>>;
  setStoreName: React.Dispatch<React.SetStateAction<string>>;
}>({
  isAdmin: false,
  setIsAdmin: () => {},
  storeName: "Store",
  hasSetup: false,
  setHasSetup: () => {},
  setStoreName: () => {},
});

export const useAppContext = () => useContext(AppContext);
