// UserContext.jsx - Pure Context API implementation
import { createContext, useState } from "react";

// Create the context with a default value
const userContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});

const UserProvider = ({ children }) => {
  // Initialize user state
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log("Login called with:", userData);
    setUser(userData); // This updates the context state
  };

  const logout = () => {
    console.log("Logout called");
    // Only remove the token from localStorage, not the user data
    localStorage.removeItem('bus-operator-token');
    setUser(null);
  };

  // Context value object
  const contextValue = {
    user,
    login,
    logout
  };

  return (
    <userContext.Provider value={contextValue}>
      {children}
    </userContext.Provider>
  );
};

export { UserProvider };
export default userContext;