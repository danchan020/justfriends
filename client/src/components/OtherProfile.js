import React from 'react'
import { VStack, Avatar, Text, Tag, Box, Center } from '@chakra-ui/react'
import TopBar from './TopBar'

export default function OtherProfile({profile, handleSignOut}) {

  return (
    <div>
      <TopBar handleSignOut={handleSignOut}/>
        <Box bg="secondary">
          <Center>  {profile.first_name}'s Profile </Center>
        </Box>

        <Box bg="secondary" marginTop={15} maxW='sm' borderWidth='1px' borderRadius='lg' paddingTop={10} paddingBottom={10}>
      <VStack>
        <Avatar size='2xl' src={profile.avatar} />
        <Text> { profile.first_name}{' '}{profile.last_name} </Text>
        <Tag> @{ profile.username}</Tag>
        <Text> { profile.email} </Text>
        <Text> { profile.bio} </Text>
      </VStack>
        </Box>
    </div>
  )
}
