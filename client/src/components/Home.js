import React from 'react'
import { VStack, HStack, Center, Avatar, Text, Tag } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from  '../features/user'
import ProfileEdit from './ProfileEdit'
import ProfileDelete from './ProfileDelete'

export default function Home({handleSignOut}) {
  const user = useSelector(selectUser)

  return (
    <>
      <Center> <img src='/capstone.png' alt='logo' width='100' height='100'/> </Center>
      <VStack>
        <Text> My Profile </Text>
        <Avatar size='2xl' src={ user ? user.avatar : null} />
        <Text> { user ? user.first_name : null }{' '}{user ? user.last_name : null} </Text>
        <Tag> @{ user ? user.username : null }</Tag>
        <Text> { user ? user.email : null } </Text>
        <Text> { user ? user.bio : null } </Text>
      </VStack>
      <Center>
        <HStack>
          <ProfileEdit/>
          <ProfileDelete handleSignOut={handleSignOut}/>
        </HStack>
      </Center>
      
      
      <div onClick={handleSignOut}> Logout </div>
    </>
  )
}
