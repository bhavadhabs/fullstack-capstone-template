import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("auth-token")
  );

  const [userName, setUserName] = useState(
    sessionStorage.getItem("name") || ""
  );

  const [userEmail, setUserEmail] = useState(
    sessionStorage.getItem("email") || ""
  );

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);