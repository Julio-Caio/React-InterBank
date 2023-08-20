import React from "react";
import Header from "../../components/Header/Header";
import { ChakraProvider, SimpleGrid, Box, Button } from "@chakra-ui/react";
import './style.css'
const imageBg = require('../../assets/images/imageBG.png')

const Home: React.FC = () => {
    return (
  <>
    <ChakraProvider>
    <Header />
    <SimpleGrid columns={2}>
            <Box id='imgBG' backgroundImage={imageBg}></Box>
            <Box id='propaganda' bg="transparent" w="100%" p='6' color="white">
                <h3>Sua conta poupança em um ambiente seguro, simples e prático!</h3>
                <Button colorScheme="gray" size="lg" mt='4' onClick={() => window.location.href='/users/signup'}><a>Abra sua conta</a></Button>
            </Box>
    </SimpleGrid>

    </ChakraProvider>
    <footer>
        <center><p> &copy; InterBank - 2023</p></center>
    </footer>
  </>)
}

export default Home;