import React from 'react'
import { Box, VStack, HStack, Center, Avatar, Text, Tag } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectUser } from  '../features/user'
import TopBar from './TopBar'
import UserCard from './UserCard'

export default function UserFeatures({handleSignOut, users, handleProfileClick, handleCreateConversation}) {
  const user = useSelector(selectUser)

  let renderOtherUsers
  if (users){renderOtherUsers = users.map((user) => {
    return (
      <UserCard key={user.id}{...user} handleProfileClick={handleProfileClick} handleCreateConversation={handleCreateConversation}/>
      )
    })
  }

  return (
    <>
      <TopBar handleSignOut={handleSignOut}/>
      <Box bg="secondary"> 
        <Center>
          Recommended Friends
        </Center> 
      </Box>
      <VStack>
        {renderOtherUsers}
      </VStack>
    </>
  )
}
