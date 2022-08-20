import React from 'react'
import TopBar from './TopBar'
import ConversationCard from './ConversationCard'
import { Box, Center, Divider } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectUser } from  '../features/user'

export default function Conversations({handleSignOut, conversations}) {

  const user = useSelector(selectUser)

  let renderConversations
  if (conversations && user){renderConversations = conversations.map((conversation) => {

    return (
      <ConversationCard key={conversation.id} id={conversation.id} author={conversation.author} receiver={conversation.receiver} messages={conversation.messages}/>
      )
    })
  }

  return (
    <div style={{overflow: 'scroll'}}>
        <TopBar handleSignOut={handleSignOut}/>
        <Box bg="secondary"> 
          <Center>
            My Messages
          </Center> 
        </Box>
        <Divider orientation='horizontal' borderColor="primary"/>
        {renderConversations}
        <Divider orientation='horizontal' />
    </div>
  )
}
