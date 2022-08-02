import React, {useState} from 'react'
import TopBar from './TopBar'
import { Box, VStack, HStack, Center, Avatar, Text, FormControl, Input, Button } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from  '../features/user'

export default function Conversation({handleSignOut, conversations}) {
    let { id } = useParams()
    const user = useSelector(selectUser)
    const [newMessageData, setNewMessageData] = useState({});
    const conversation = conversations.find((conversation) => conversation.id == id)
    
    let userDisplayed 
    if (user.id === conversation.author.id) {userDisplayed = conversation.receiver} else {userDisplayed = conversation.author}

    let renderMessages 
    if (conversation){renderMessages = conversation.messages.map((message) => {
        return user.id === message.user_id ? (
        <div>
            <Text> {message.body} </Text>
        </div>) : (
        <div>
            <HStack>
                <Avatar 
                size='sm'
                alt={user.id === conversation.author_id ? conversation.receiver.first_name : conversation.author.first_name}
                src={user.id === conversation.author_id ? conversation.receiver.avatar : conversation.author.avatar}
                />
                <Text> {message.body} </Text>
            </HStack>
    
        </div>)
    })
}
        


    const handleChange = (e) => {
        setNewMessageData({
            user_id: user.id,
            body: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/conversations/${conversation.id}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessageData),
        })
    }

  return (
    <div>
        <TopBar handleSignOut={handleSignOut}/>
        <Box bg="secondary"> 
            <Center>
            Conversation with {userDisplayed.first_name}
            </Center> 
        </Box>
        {renderMessages}
        <VStack>
            <form onSubmit={handleSubmit}>
                <FormControl onChange={handleChange}>
                    <HStack>
                        <Input variant="filled" bg="tertiary" type="body" class="form-control" id="body" placeholder="Send message..." width={275}/>
                        <Button variant="solid" bg="secondary" type="submit" width={75} > send </Button>   
                    </HStack>
                </FormControl>
            </form>
        </VStack>
    </div>
  )
}
