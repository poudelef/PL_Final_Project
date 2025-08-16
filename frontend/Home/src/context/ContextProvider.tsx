import React, { createContext } from "react";

type userContextType = {
  role: "admin" | "landlord" | "user";
  authenticated: boolean;
};

export const userContext = createContext<userContextType>({
  // Create context with a real default -> user
  role: "user",
  authenticated: false,
});

type Props = { children: React.ReactNode };
// it means whatever is nested inside the provider will be rendered

const ContextProvider: React.FC<Props> = ({ children }) => {
  const role: userContextType["role"] = "admin";
  const authenticated = true; // Set this to false if we don't want to give access
  return (
    <userContext.Provider value={{ role, authenticated }}>
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;

// ContextProvider sets the actual value.
