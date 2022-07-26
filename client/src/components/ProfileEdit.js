import React from 'react'
import { Button, FormControl, HStack, Input, Stack } from '@chakra-ui/react'
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

export default function ProfileEdit() {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
        <Button onClick={onOpen}> Edit </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit your profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form>
                  <FormControl>
                    <Stack spacing={3}>
                        <HStack spacing={10}>
                            <Input variant="filled" bg="tertiary" type="text" class="form-control" id="first_name" placeholder="First Name" width={130}/>
                            <Input variant="filled" bg="tertiary" type="text" class="form-control" id="last_name" placeholder="Last Name" width={130}/>
                        </HStack>
                        <Input variant="filled" bg="tertiary" type="text" class="form-control" id="username" placeholder="Username" width={300}/>
                        <Input variant="filled" bg="tertiary" type="email" class="form-control" id="email" placeholder="Email" width={300}/>
                        <Input variant="filled" bg="tertiary" type="text" class="form-control" id="bio" placeholder="Bio" width={300}/>
                        <Input variant="filled" bg="tertiary" type="text" class="form-control" id="avatar" placeholder="Avatar URL" width={300}/>
                    </Stack>
                  </FormControl>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' variant='outline' mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' variant='solid'>Update Profile</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
    </div>
  )
}
