import React from 'react'
import { VStack, HStack, Center, Avatar, Text, Tag } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectUser } from  '../features/user'
import ProfileEdit from './ProfileEdit'
import ProfileDelete from './ProfileDelete'
import TopBar from './TopBar'

export default function UserProfile({handleSignOut}) {
  const user = useSelector(selectUser)

  return (
    <>
      <TopBar handleSignOut={handleSignOut}/>
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
    </>
  )
}
