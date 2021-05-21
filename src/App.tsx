import React, { useState, useEffect, FormEvent } from "react";
import Login from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import "./App.css";

export interface TransactionsProps {
  amount: string;
  timestamp: string;
  toAddress?: string;
  fromAddress?: string;
}

export interface AddressInfo {
  balance: string;
  transactions: Array<TransactionsProps>;
}

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("enter wallet address");
  const [addressInfo, setAddressInfo] = useState<AddressInfo>();
  const [signinError, setSigninError] = useState(false);

  const updateUserData = () => {
    fetch(
      `http://jobcoin.gemini.com/porthole-reliably/api/addresses/${username}`
    )
      .then((response) => response.json())
      .then((data) => setAddressInfo(data));
  };
  useEffect(() => {
    updateUserData();
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    updateUserData();
    if (
      addressInfo?.balance === "0" &&
      addressInfo?.transactions.length === 0
    ) {
      setLoggedIn(false);
      setSigninError(true);
    } else {
      setLoggedIn(true);
      setSigninError(false);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <Dashboard
          username={username}
          handleLogout={handleLogout}
          addressInfo={addressInfo}
          transactions={addressInfo?.transactions}
          balance={addressInfo?.balance}
          updateUserData={updateUserData}
        />
      ) : (
        <Login
          username={username}
          setUsername={setUsername}
          handleLogin={handleLogin}
          error={signinError}
        />
      )}
    </div>
  );
};

export default App;
