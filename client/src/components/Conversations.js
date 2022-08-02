import React from 'react'
import TopBar from './TopBar'
import ConversationCard from '../ConversationCard'
import { Box, VStack, HStack, Center, Avatar, Text, Tag } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectUser } from  '../features/user'

export default function Conversations({handleSignOut, conversations, handleConversation}) {

  const user = useSelector(selectUser)

  let renderConversations
  if (conversations && user){renderConversations = conversations.map((conversation) => {

    return (
      <ConversationCard key={conversation.id} id={conversation.id} author={conversation.author} receiver={conversation.receiver} messages={conversation.messages} handleConversation={handleConversation}/>
      )
    })
  }

  return (
    <div>
        <TopBar handleSignOut={handleSignOut}/>
        <Box bg="secondary"> 
        <Center>
          My Conversations
        </Center> 
      </Box>
      <VStack>
        {renderConversations}
      </VStack>
    </div>
  )
}
