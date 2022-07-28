import React from 'react'
import { VStack, Avatar, Text, Tag } from '@chakra-ui/react'
import TopBar from './TopBar'

export default function OtherProfile({profile, handleSignOut}) {

  return (
    <>
      <TopBar handleSignOut={handleSignOut}/>
      <VStack>
        <Text>  {profile.first_name}'s Profile </Text>
        <Avatar size='2xl' src={profile.avatar} />
        <Text> { profile.first_name}{' '}{profile.last_name} </Text>
        <Tag> @{ profile.username}</Tag>
        <Text> { profile.email} </Text>
        <Text> { profile.bio} </Text>
      </VStack>
    </>
  )
}
