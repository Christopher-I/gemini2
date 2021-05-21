import React, { useState, useEffect, FunctionComponent } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import {
  LineChart,
  CartesianGrid,
  Line,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  XAxis,
} from "recharts";
import { AddressInfo } from "../../App";
import { TransactionsProps } from "../../App";

interface DashboardProps {
  username: string;
  handleLogout: () => void;
  addressInfo: AddressInfo | undefined;
  transactions?: TransactionsProps[];
  balance?: string;
  updateUserData: () => void;
}

const Dashboard: FunctionComponent<DashboardProps> = ({
  username,
  handleLogout,
  addressInfo,
  transactions,
  balance = 0,
  updateUserData,
}) => {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("0");
  const [addressError, setAddressError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [transactionFail, setTransactionFail] = useState(false);
  const [transactionsData, setTransactionsData] =
    useState<TransactionsProps[] | undefined>();

  const handleSendCoins = () => {
    setTransactionSuccess(false); //reset success and error state
    setTransactionFail(false);
    if (
      isNaN(Number(sendAmount)) ||
      Number(sendAmount) < 0 ||
      !sendAmount ||
      sendAmount > balance
    ) {
      setAmountError(true);
      return;
    }
    if (!destinationAddress) {
      setAddressError(true);
      return;
    }
    setAddressError(false);
    setAmountError(false);

    fetch(
      `http://jobcoin.gemini.com/porthole-reliably/api/transactions?fromAddress=${username}&toAddress=${destinationAddress}&amount=${sendAmount}`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTransactionSuccess(true);
        updateUserData();
      })
      .catch((error) => {
        setTransactionFail(true);
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    let data: any[] | undefined = [];
    let coinCount = 50;

    transactions?.forEach(
      ({ timestamp, toAddress, fromAddress, amount }, index) => {
        const relevantTransaction =
          fromAddress === username || toAddress === username;

        if (relevantTransaction) {
          let name = format(new Date(timestamp), "MM/dd, hh:mm aaa");
          let walletBalance;

          if (index === 0) {
            walletBalance = amount;
          }
          if (fromAddress === username && index !== 0) {
            walletBalance = Number(coinCount) - Number(amount);
            coinCount = walletBalance;
          }
          if (toAddress === username && index !== 0) {
            walletBalance = Number(coinCount) + Number(amount);
            coinCount = walletBalance;
          }

          data?.push({
            name: name,
            uv: walletBalance,
            amount: amount,
            coinCount,
          });
        }
      }
    );
    const sortedDates = data.sort((a, b) => b.name - a.name);
    setTransactionsData(sortedDates);
    updateUserData();
  }, [balance]);

  return (
    <Container>
      <Menu>
        <WalletAddress>{username}</WalletAddress>
        <SignoutButton onClick={handleLogout}>Sign Out</SignoutButton>
      </Menu>
      <Body>
        <LeftSection>
          <Balance>
            <BalanceTitle>Jobcoin Balance</BalanceTitle>
            <BalanceAmount>
              {addressInfo?.balance ? addressInfo.balance : ""}
            </BalanceAmount>
          </Balance>
          <Send>
            <BalanceTitle>Send Jobcoin</BalanceTitle>
            <SendInfo>
              <Title>Depositor Address</Title>
              <Input
                type="text"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
              />
              {addressError && (
                <Error>Incorrect address, please check and try again</Error>
              )}
              <Title>Amount To Send</Title>
              <Input
                type="text"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
              />
              {amountError && (
                <Error>Incorrect amount, please check and try again</Error>
              )}
              <Button onClick={handleSendCoins}>Send Jobcoins</Button>
              {transactionSuccess && <Success>Transaction Complete!</Success>}
              {transactionFail && (
                <Error>Transaction Failed, Please Try Again Later!</Error>
              )}
            </SendInfo>
          </Send>
        </LeftSection>
        <RightSection>
          <Graph>
            Balance Over Time
            <ResponsiveContainer width="95%" height="95%">
              <LineChart width={500} height={300} data={transactionsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Graph>
        </RightSection>
      </Body>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  border-bottom: 1px solid lightgrey;
  padding: 0 50px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  margin: 40px;
`;
const LeftSection = styled.div``;
const RightSection = styled.div`
  width: 80%;
`;

const Balance = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: 300px;
`;

const BalanceTitle = styled.div`
  display: flex;
  color: lightgrey;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  height: 60px;
  font-size: 18px;
  font-weight: bold;
`;

const BalanceAmount = styled.div`
  display: flex;
  color: grey;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  font-size: 18px;
  font-weight: bold;
  height: 150px;
`;

const Graph = styled.div`
  border: 1px solid lightgrey;
  height: 85vh;
  width: 100%;
  margin-left: 40px;
  border-radius: 5px;
`;

const Send = styled(Balance)`
  margin-top: 30px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
  border-radius: 5px;
  border: 0px;
  height: 35px;
  width: 100%;
  margin-top: 30px;

  :hover {
    cursor: pointer;
  }
`;

const SendInfo = styled.div`
  margin: 20px;
`;

const Input = styled.input`
  display: flex;
  flex-direction: column;
  width: 97%;
  height: 30px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 10px;
  color: lightgrey;
  margin-top: 20px;
`;

const SignoutButton = styled.div`
  cursor: pointer;
  color: blue;
`;

const WalletAddress = styled.div`
  color: grey;
  font-weight: bold;
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const Success = styled.div`
  color: green;
  font-size: 12px;
  margin-top: 5px;
`;
