import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null); // This will hold { role, data }

  // Login for regular user
  const loginUser = (userData) => {
    console.log("loginUser called with userData:", userData); // Debug log
    setAuthData({ role: "user", data: userData });
  };

  // Login for bus operator
  const loginBusOperator = (operatorData) => {
    console.log("loginBusOperator called with operatorData:", operatorData); // Debug log
    setAuthData({ role: "bus-operator", data: operatorData });
  };

  // Log whenever the authData changes
  console.log("authData updated:", authData);

  const logout = () => {
    console.log("logout called"); // Debug log
    setAuthData(null); // Clear auth data on logout
  };

  // Helper to check if it's user or bus operator
  const isUser = authData?.role === "user";
  const isBusOperator = authData?.role === "bus-operator";

  return (
    <AuthContext.Provider value={{ authData, loginUser, loginBusOperator, logout, isUser, isBusOperator }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
