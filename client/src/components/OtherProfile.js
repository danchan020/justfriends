import React from 'react'
import { VStack, Avatar, Text, Tag } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectUser } from  '../features/user'
import TopBar from './TopBar'

export default function OtherProfile({profile, handleSignOut}) {
  console.log(profile)

  return (
    <>
      <TopBar handleSignOut={handleSignOut}/>
      <VStack>
        <Text>  Profile </Text>
        <Avatar size='2xl' src={profile.avatar} />
        <Text> { profile.first_name}{' '}{profile.last_name} </Text>
        <Tag> @{ profile.username}</Tag>
        <Text> { profile.email} </Text>
        <Text> { profile.bio} </Text>
      </VStack>
    </>
  )
}
