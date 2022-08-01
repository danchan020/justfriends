import React, {useState} from 'react'
import TopBar from './TopBar'
import { Box, VStack, HStack, Center, Avatar, Text, Tag, FormControl, Input, Button } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from  '../features/user'

export default function Conversation({handleSignOut, conversations}) {
    const user = useSelector(selectUser)
    let { id } = useParams()
    const conversation = conversations.find((conversation) => conversation.id == id)

    const [newMessageData, setNewMessageData] = useState({});

    let userDisplayed 
    if (user.id === conversation.author.id) {userDisplayed = conversation.receiver} else {userDisplayed = conversation.author}

    const handleChange = (e) => {
        setNewMessageData({
            user_id: user.id,
            body: e.target.value
        })
        // console.log(newMessageData)
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
