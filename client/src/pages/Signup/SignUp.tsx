import './signup.css';
import React from 'react';
import Header from "../../components/Header/Header";
import { mask } from 'remask';
import { ChakraProvider, FormControl, Center, Box, Button, FormLabel, Input } from '@chakra-ui/react';
const logo = require('../../assets/images/logo.png');

const cpfMask = (value: string) => {
    return mask(value, ['999.999.999-99']);
}

const SignUp: React.FC = (event) => {    
      
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
            <Center>
              <main>
                <form action="/signup" method="POST">

                  <div className="field" style={{ marginTop: '2%', padding: '5%' }}>
                    <FormLabel htmlFor='nameInput'>Nome Completo</FormLabel>
                    <Input size={'lg'} id='nameInput' name="name" placeholder="Digite seu nome completo" type="text" />
                  </div>

                  <div className="field" style={{ marginTop: '2%', padding: '5%' }}>
                    <FormLabel htmlFor='idInput'>CPF</FormLabel>
                    <Input
                      size={'lg'}
                      type="text"
                      id='idInput'
                      name="cpf"
                      placeholder="CPF"
                      onChange={(event) => {
                        event.target.value = cpfMask(event.target.value);
                      }}
                      maxLength={14}
                    />
                  </div>

                  <div className="field" style={{ marginTop: '2%', padding: '5%' }}>
                    <FormLabel htmlFor='emailInput'>E-mail</FormLabel>
                    <Input size={'lg'} id='emailInput' name="email" placeholder="Digite seu e-mail" type="email" />
                  </div>

                  <div className="field" style={{ marginTop: '2%', padding: '5%' }}>
                    <FormLabel htmlFor="passwordInput">Senha</FormLabel>
                    <Input size={'lg'} id='passwordInput' name="password" placeholder="Digite sua senha" type="password" minLength={8} />
                  </div>

                  <div className="date-field" style={{ marginTop: '2%', padding: '5%' }}>
                    <FormLabel htmlFor="dateInput">Data de Nascimento</FormLabel>
                    <Input size={'lg'} id='dateInput' name="date" placeholder="DD/MM/YY" type="date" min={"2005-07-01"} max={"2023-11-01"} />
                  </div>

                  <center><Button id='btn' size="lg" type='submit'>Cadastrar</Button></center>
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

export default SignUp;