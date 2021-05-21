import React, { useState, useEffect } from "react";
import Login from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import "./App.css";

interface Transactions {
  amount: string;
  timestamp: string;
  toAddress?: string;
  fromAddress?: string;
}

export interface AddressInfo {
  balance: string;
  transactions: Array<Transactions>;
}

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("enter wallet address");
  const [addressInfo, setAddressInfo] = useState<AddressInfo>();
  const [signinError, setSigninError] = useState(false);

  useEffect(() => {
    fetch(
      `http://jobcoin.gemini.com/porthole-reliably/api/addresses/${username}`
    )
      .then((response) => response.json())
      .then((data) => setAddressInfo(data));
  }, [addressInfo, username]);

  const handleLogin = () => {
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
