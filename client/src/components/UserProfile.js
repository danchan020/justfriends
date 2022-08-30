import React from 'react'
import { VStack, HStack, Center, Avatar, Text, Tag, Box,Divider } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectUser } from  '../features/user'
import ProfileEdit from './ProfileEdit'
import ProfileDelete from './ProfileDelete'
import TopBar from './TopBar'

export default function UserProfile({handleSignOut}) {
  const user = useSelector(selectUser)

  return (
    <div style={{overflow: 'scroll'}}>
      <TopBar handleSignOut={handleSignOut}/>
      <Box bg="secondary"> 
        <Center>
          My Profile
        </Center> 
      </Box>
      <Divider orientation='horizontal' borderColor="primary"/>

      <Box bg="secondary" marginTop={15} maxW='sm' borderWidth='1px' borderRadius='lg' paddingTop={10} paddingBottom={10} marginLeft="auto" marginRight="auto"> 
      <VStack>
        <Avatar size='2xl' src={ user ? user.avatar : null} />
        <Text fontWeight={'bold'}> { user ? user.first_name : null }{' '}{user ? user.last_name : null} </Text>
        <Tag> @{ user ? user.username : null }</Tag>
        <Text> { user ? user.email : null } </Text>
        <Text textAlign={'center'} padding={3}> { user ? user.bio : null } </Text>
      </VStack>
      <Center marginTop="10px">
        <HStack>
          <ProfileEdit/>
          <ProfileDelete handleSignOut={handleSignOut}/>
        </HStack>
      </Center>

      </Box>
    </div>
  )
}
