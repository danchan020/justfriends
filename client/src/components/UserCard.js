import React from 'react'
import { VStack, HStack, Center, Avatar, Text, Tag, Box } from '@chakra-ui/react'

export default function UserCard({id, avatar, first_name, last_name, username}) {
  return (
    <Box bg="tertiary" height={65} width="100%">
        <HStack>
            <Avatar size='md' src={ avatar } />
            <VStack>
                <Text>{first_name}{ ' ' }{last_name}</Text>
                <Tag colorScheme="yellow"> @{ username }</Tag>
            </VStack>
            
        </HStack>
    </Box>

  )
}
