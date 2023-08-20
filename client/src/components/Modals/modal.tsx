import React from 'react'
import {useDisclosure} from '@chakra-ui/react'
import {Button, FormControl, Input, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import './style.css'

function MyModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
  
    return (
      <>
        <Button colorScheme='red' onClick={onOpen}>DEPOSITAR</Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Depósito</ModalHeader>
            <form action='/api/admin/deposit' method='POST'>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Valor para o Depósito: </FormLabel>
                  <Input ref={initialRef} name='depositAmount' type='number' placeholder='Inserir apenas números'/>
                </FormControl>
              </ModalBody>
    
              <ModalFooter>
                <Button id='btn' type='submit' colorScheme='blue' mr={6}>
                  Confirmar
                </Button>
                <Button id='btn' onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default MyModal;