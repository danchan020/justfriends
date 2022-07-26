import React from 'react'
import { Button, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export default function ProfileDelete() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
  return (
    <div>
        <Button onClick={onOpen}> Delete </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader> Delete your account? </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Alert status='error'>
                  <AlertIcon/>
                  <AlertTitle>Are you sure?</AlertTitle>
                  <AlertDescription> Deleting your account will result in the permanent loss of your profile and all related information </AlertDescription>
                </Alert>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='red' variant='solid'>Yes, delete </Button>
                <Button colorScheme='green' variant='solid' onClick={onClose}> No, nevermind </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
    </div>
  )
}
