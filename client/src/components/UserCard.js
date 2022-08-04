import React from 'react'
import { VStack, HStack, IconButton, Avatar, Text, Tag, Box, Divider } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { CgProfile } from 'react-icons/cg'

export default function UserCard({id, avatar, first_name, last_name, username, handleProfileClick, handleCreateConversation}) {
  return (
    <div className="chat">
      <Avatar className='chat_image' size='md' src={ avatar } />
      <div className='chat_details'>
        <h2 color='black'> {first_name}{ ' ' }{last_name} </h2>
        <Tag colorScheme="yellow"> @{ username }</Tag>
      </div>
      <div style={{justifyContent: 'space-between'}}>
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
      </div>
  </div>

                

            




  )
}
