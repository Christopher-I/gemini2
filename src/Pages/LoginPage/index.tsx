import React, { FormEvent, FunctionComponent } from "react";
import styled from "styled-components";

interface LoginProps {
  handleLogin: (e: FormEvent) => void;
  username: string;
  setUsername: (arg: string) => void;
  error: boolean;
}

const LoginPage: FunctionComponent<LoginProps> = ({
  handleLogin,
  username,
  setUsername,
  error = false,
}) => {
  return (
    <Container>
      <Wrapper>
        <Header>Welcome! Sign In With Your JobCoin Address</Header>
        <form onSubmit={(e) => false}>
          <Body>
            <Title>Jobcoin Address</Title>

            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onSubmit={(e) => handleLogin(e)}
            />
            {error && (
              <Error>Incorrect address, please check and try again</Error>
            )}
            <Button onClick={(e) => handleLogin(e)}>Sign In </Button>
          </Body>
        </form>
      </Wrapper>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 500px;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  color: lightgrey;
  font-weight: bold;
  font-size: 20px;
  padding: 0 100px;
  border: grey 1px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgrey;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: lightgrey;
  font-weight: bold;
  font-size: 12;
  padding: 0 100px;
  height: 200px;
`;

const Input = styled.input`
  display: flex;
  flex-direction: column;
  width: 97%;
  height: 30px;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
  border-radius: 5px;
  border: 0px;
  height: 40px;
  width: 100%;
  margin-bottom: 10px;
  margin-top 30px;

  :hover {
    cursor: pointer;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
