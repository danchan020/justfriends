import React from 'react'
import { VStack, HStack, IconButton, Avatar, Text, Tag, Box } from '@chakra-ui/react'
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
            <IconButton key={id}
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
                aria-label='Send Message'
                size='sm'
                icon={<ChatIcon/>}
                onClick={()=>{handleCreateConversation(id)}}
            />
            
        </HStack>
    </Box>

  )
}
