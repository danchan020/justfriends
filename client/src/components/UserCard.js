import React from 'react'
import { VStack, HStack, IconButton, Avatar, Text, Tag, Box, Divider } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { CgProfile } from 'react-icons/cg'

export default function UserCard({id, avatar, first_name, last_name, username, handleProfileClick, handleCreateConversation}) {
  return (
    <Box  bg="tertiary" height={65} width="100%">
        <HStack>
            <Avatar size='md' src={ avatar } />
            <VStack>
                <Text>{first_name}{ ' ' }{last_name}</Text>
                <Tag colorScheme="yellow"> @{ username }</Tag>
            </VStack>
            <IconButton
                variant='outline'
                colorScheme='green'
                aria-label='See Profile'
                size='sm'
                icon={<CgProfile/>}
                onClick={()=>{handleProfileClick(id)}}
            />
            <IconButton
                variant='outline'
                colorScheme='green'
                aria-label='Create Conversation'
                size='sm'
                icon={<ChatIcon/>}
                onClick={()=> {handleCreateConversation(id)}}
            />
            
        </HStack>
        <Divider orientation='horizontal' borderColor="primary"/>

    </Box>

  )
}
