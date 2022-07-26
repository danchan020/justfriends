import React, {useState} from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { login } from  '../features/user'
import { selectUser } from  '../features/user'

export default function ProfileEdit() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const initialUserData = {
        first_name: user ? user.first_name : null,
        last_name: user ? user.last_name : null,
        username: user ? user.username : null,
        email: user ? user.email : null,
        avatar: user ? user.avatar : null,
        bio: user ? user.bio : null,
     };

     console.log(initialUserData)
     
     const [updateUserData, setUpdateUserData] = useState(initialUserData);
     const [error, setError] = useState([]);
     const { isOpen, onOpen, onClose } = useDisclosure()
     
     const handleChange = (e) => {
         const { id, value } = e.target;
         setUpdateUserData({ ...updateUserData, [id]: value });
        };
        
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
        e.target.reset();
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(updateUserData),
         }).then((r) => {
            if (r.ok) {
               r.json().then((user) => dispatch(login(user)))
            } else {
               r.json().then((errorData) => setError(errorData.error));
            }
         });
    }

  return (
    <div>
        <Button onClick={onOpen}> Edit </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit your profile</ModalHeader>
              <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                    <FormControl onChange={handleChange}>
                        <ModalBody>
                            <Stack spacing={3}>
                                <HStack spacing={10}>
                                    <Input variant="filled" bg="tertiary" type="text" class="form-control" id="first_name" placeholder="First Name" width={130} value={updateUserData.first_name}/>
                                    <Input variant="filled" bg="tertiary" type="text" class="form-control" id="last_name" placeholder="Last Name" width={130} value={updateUserData.last_name}/>
                                </HStack>
                                <Input variant="filled" bg="tertiary" type="text" class="form-control" id="username" placeholder="Username" width={300} value={updateUserData.username}/>
                                <Input variant="filled" bg="tertiary" type="email" class="form-control" id="email" placeholder="Email" width={300} value={updateUserData.email}/>
                                <Input variant="filled" bg="tertiary" type="text" class="form-control" id="bio" placeholder="Bio" width={300} value={updateUserData.bio}/>
                                <Input variant="filled" bg="tertiary" type="text" class="form-control" id="avatar" placeholder="Avatar URL" width={300} value={updateUserData.avatar}/>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' variant='outline' mr={3} onClick={onClose}>
                            Cancel
                            </Button>
                            <Button colorScheme='red' variant='solid' type='submit' onClick={onClose}>Update Profile</Button>
                        </ModalFooter>
                    </FormControl>
                </form>
            </ModalContent>
          </Modal>
    </div>
  )
}
