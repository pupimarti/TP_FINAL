import React, { useState } from "react";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState("loading");
  const [account, setAccount] = useState("loading");
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        account,
        setAccount,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
