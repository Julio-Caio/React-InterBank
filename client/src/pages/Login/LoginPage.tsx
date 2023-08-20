import './login.css';
import React, { useState, useEffect } from 'react';
import { ChakraProvider, FormControl, Center, Box, Button, FormLabel, Input } from '@chakra-ui/react';
import Header from "../../components/Header/Header";
const logo = require('../../assets/images/logo.png');

interface UserData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handlePostRequestLogin = async (userData: UserData) => {
    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Erro ao logar usuário: ' + data.message);
      }

      setIsMessageVisible(true);
    } catch (error) {
      console.error('Erro ao fazer a requisição POST:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const userData: UserData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    };

    handlePostRequestLogin(userData);
  };

  useEffect(() => {
    if (isMessageVisible) {
      setTimeout(() => {
        setIsMessageVisible(false);
        setMessage('');
      }, 3000);
    }
  }, [isMessageVisible]);

  return (
    <ChakraProvider>
      <Header />
      <Box id='mainBox' color={"whiteAlpha.900"}>
        <Box id="Box">
          <div id="logo">
            <img src={logo} alt="Logo" />
            <div id="logo-border"></div>
          </div>

          <FormControl isRequired>
          <center>{isMessageVisible && <div className="alert alert-success" role="alert">{message}</div>}</center>
            <Center>
              <main>
                <form onSubmit={handleSubmit} action="/signin" method="POST">
                  <div className="email-field" style={{ marginTop: '2%', padding: '5%' }}>
                    <FormLabel htmlFor='emailInput'>E-mail</FormLabel>
                    <Input size={'lg'} name="email" id='emailInput' placeholder="Digite seu e-mail" type="email" />
                  </div>

                  <div className="password-field" style={{ marginTop: '2%', padding: '5%' }}>
                    <FormLabel htmlFor="passwordInput">Senha</FormLabel>
                    <Input size={'lg'} name='password' id='passwordInput' placeholder="Digite sua senha" type="password" minLength={8} />
                  </div>
                  <center><Button id='btn' size="lg" type='submit'>Entrar</Button></center>
                  <br />
                </form>
              </main>
            </Center>
          </FormControl>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Login;