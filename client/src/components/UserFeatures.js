import React from 'react'
import { Box, Center, Divider } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectUser } from  '../features/user'
import TopBar from './TopBar'
import UserCard from './UserCard'

export default function UserFeatures({handleSignOut, users, handleProfileClick, handleCreateConversation}) {
  const user = useSelector(selectUser)

console.log(user)
console.log(users)

  let renderOtherUsers
  if (users.length > 0 && user){renderOtherUsers = users.map((user) => {
    return (
      <UserCard key={user.id}{...user} handleProfileClick={handleProfileClick} handleCreateConversation={handleCreateConversation}/>
      )
    })
  }

  return (
    <div style={{overflow: 'scroll'}}>
      <TopBar handleSignOut={handleSignOut}/>
      <Box bg="secondary"> 
        <Center>
          Recommended Friends
        </Center> 
      </Box>
      <Divider orientation='horizontal' borderColor="primary"/>
        {renderOtherUsers}
      <Divider orientation='horizontal' borderColor="secondary"/>
    </div>
  )
}
