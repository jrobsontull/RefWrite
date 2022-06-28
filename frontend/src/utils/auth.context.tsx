import { createContext, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  user: Object | null;
  verified: boolean;
  isVerifying: boolean;
}

interface AuthContext {
  user: User;
  authUser: () => void;
}

const AuthContext = createContext<AuthContext>({
  user: { user: null, verified: false, isVerifying: false },
  authUser: () => undefined,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState({
    user: null,
    verified: false,
    isVerifying: false,
  });

  const authUser = async (): Promise<void> => {
    // Update verifying status
    setUser((currentState) => {
      const result = currentState;
      result.isVerifying = true;
      return result;
    });

    // Get current user details
    const userLocal: string | null = localStorage.getItem('user');
    if (!userLocal) {
      setUser({
        user: null,
        verified: false,
        isVerifying: false,
      });
    } else {
      // User data exitst
      const userLocalJson = JSON.parse(userLocal); // add type later on
      const verifyResponse = await verifyUser(); // add function for verifying token

      setUser({
        user: userLocalJson,
        verified: verifyResponse,
        isVerifying: false,
      });
    }
  };

  const verifyUser = async (): Promise<boolean> => {
    return true;
  };

  useEffect(() => {
    authUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
