import React from 'react'
import { VStack, Avatar, Text, Tag, Box, Center } from '@chakra-ui/react'
import TopBar from './TopBar'

export default function OtherProfile({profile, handleSignOut}) {

  return (
    <div style={{overflow: 'scroll'}}>
      <TopBar handleSignOut={handleSignOut}/>
        <Box bg="secondary">
          <Center>  {profile.first_name}'s Profile </Center>
        </Box>
        <Box bg="secondary" marginTop={15} maxW='sm' borderWidth='1px' borderRadius='lg' paddingTop={10} paddingBottom={10} marginLeft="auto" marginRight="auto" >
      <VStack>
        <Avatar size='2xl' src={profile.avatar} />
        <Text fontWeight={'bold'}> { profile.first_name}{' '}{profile.last_name} </Text>
        <Tag> @{ profile.username}</Tag>
        <Text> { profile.email} </Text>
        <Text textAlign={'center'} padding={3}> { profile.bio} </Text>
      </VStack>
        </Box>
    </div>
  )
}
