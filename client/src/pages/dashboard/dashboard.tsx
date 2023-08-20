import React, { useEffect, useState } from 'react';
import SideBar from '../../components/Offcanvas/sidebar';
import MyModal from '../../components/Modals/modal';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './style.css'
import { Box, ChakraProvider, GridItem, Grid } from '@chakra-ui/react';

const Dashboard: React.FC = () => {
    const [total, setTotal] = useState(20);

    useEffect(() => {
        fetch('/api/admin/dashboard')
            .then(response => response.json())
            .then(data => setTotal(data.saldo))
            .catch(err => console.error(err));
    }, []);

    return (
    <ChakraProvider>
        <Grid templateRows='repeat(3, 1fr)' gap={4} templateColumns='repeat(5, 1fr)'>
            <SideBar />
            <GridItem colSpan={4} id='secondBox' marginTop={20}>
                <Box>
                    <div className="title"> <h2>Minha Conta</h2> </div>
                    <br />
                    <h4>R$ {total}</h4><FaEyeSlash id='eye' />
                    <hr />
                </Box>
                <br />
                <Box float={'left'} maxWidth={320}>
                    <MyModal />
                </Box>
            </GridItem>
        </Grid>
        
    </ChakraProvider>
    );
}

export default Dashboard;