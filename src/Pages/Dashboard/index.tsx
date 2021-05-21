import React, { useState, FunctionComponent } from "react";
import styled from "styled-components";
import { AddressInfo } from "../../App";

interface DashboardProps {
  username: string;
  handleLogout: () => void;
  addressInfo: AddressInfo | undefined;
}

const Dashboard: FunctionComponent<DashboardProps> = ({
  username,
  handleLogout,
  addressInfo,
}) => {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("0");
  const [addressError, setAddressError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendCoins = () => {
    setSuccess(false);
    if (isNaN(Number(sendAmount)) || Number(sendAmount) < 0 || !sendAmount) {
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
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
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
              {success && <Success>Transaction Complete!</Success>}
            </SendInfo>
          </Send>
        </LeftSection>
        <RightSection>
          <Graph>sss</Graph>
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
