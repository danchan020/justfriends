import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from  '../src/features/user'
import { Box, VStack, HStack, Center, Avatar, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function ConversationCard({id, author, receiver, messages, handleConversation}) {

    const user = useSelector(selectUser)
    // const lastMessage = (messages[messages.length - 1]).body


    let userDisplayed 
    if (user.id == author.id) {userDisplayed = receiver} else {userDisplayed = author}

  return (

    <Box  key={id} bg="tertiary" height={65} width="100%" onClick={() => handleConversation(id)}>
        <HStack>
            <Avatar size='md' src={ userDisplayed.avatar } />
            <VStack>
                <Text> {userDisplayed.first_name} {' '} {userDisplayed.last_name} </Text>
                <Text> {messages.last} </Text>
            </VStack>
        </HStack>
    </Box>
  )
}
