export type transactions = {
  type: "send" | "receive";
  amount: number;
  time: string;
  from: string;
};

export type customer = {
  loggedIn: boolean;
  walletAddress: string;
  balance: string;
  transactionsList: Array<transactions>;
};

const iniState: customer = {
  loggedIn: false,
  walletAddress: "",
  transactionsList: [],
  balance: "0",
};

const userData = (state = iniState, action?: any) => {
  if (action.type === "SET_PROFILE") {
    return { ...state, general: action.payload };
  }
  if (action.type === "LOGIN") {
    return { ...state, isLoggedIn: action.payload };
  }
  return state;
};

export default userData;
