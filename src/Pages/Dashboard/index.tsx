import React from "react";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <Container>
      <Menu>Dashboard</Menu>
      <Body>
        <LeftSection>
          <Balance>
            <BalanceTitle>Jobcoin Balance</BalanceTitle>
            <BalanceAmount>$1000</BalanceAmount>
          </Balance>
          <Send>
            <BalanceTitle>Send Jobcoin</BalanceTitle>
            <SendInfo>
              <Title>Depositor Address</Title>
              <Input type="text" />
              <Title>Amount To Send</Title>
              <Input type="text" />
              <Button>Send Jobcoins</Button>
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
  height: 30px;
  border-bottom: 1px solid lightgrey;
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
  color: lightgrey;
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
  margin-bottom: 30px;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 10px;
  color: lightgrey;
`;
