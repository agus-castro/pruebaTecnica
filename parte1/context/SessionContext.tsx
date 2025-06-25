import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

type SessionContextType = {
  isLoggedIn: boolean;
  setHasLoggedIn: () => void;
  logout: () => void;
};

export const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tryLocalLogin = async () => {
      const hasPersistentLogin = await AsyncStorage.getItem('isLoggedIn');
      if (hasPersistentLogin) {
        setIsLoggedIn(true);
      }
    };
    tryLocalLogin();
  }, []);

  const onLogin = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem('isLoggedIn', 'true');
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn'); 
    setIsLoggedIn(false);
  };

  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        setHasLoggedIn: onLogin,
        logout: onLogout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (context === null) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context;
};
