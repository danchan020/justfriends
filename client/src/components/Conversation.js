import React, {useEffect, useState, useRef} from 'react'
import TopBar from './TopBar'
import { Box, VStack, HStack, Center, Avatar, Text, FormControl, Input, Button, IconButton } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from  '../features/user'
import { createConsumer } from "@rails/actioncable"
import { CgSmile } from 'react-icons/cg'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function Conversation({handleSignOut, conversations, messages, setMessages}) {
    let { id } = useParams()
    const user = useSelector(selectUser)
    const messageLast = useRef(null)
    const [newMessageData, setNewMessageData] = useState({});
    const [showEmojis, setShowEmojis] = useState(false);

    useEffect(() => {
        fetch(`/conversations/${id}/messages`)
         .then((r) => r.json())
         .then((data) => {
            setMessages(data);
         });
   }, []);

   useEffect(() => {
    if (messageLast.current) {messageLast.current.scrollIntoView({behavior: 'smooth'})}
  }, [messages])

    useEffect(() => {
    const cable = createConsumer("ws://localhost:3000/cable")
    
    const paramsToSend = {
        channel: "ConversationChannel",
        id: id
    }
    
    const handlers = {
        received(data){
            setMessages([...messages,data])
        },
    
        connected(){
            console.log("Connected!")
        },
    
        disconnected(){
            console.log("disconnected")
        }
    }
    
    const subscription = cable.subscriptions.create( paramsToSend, handlers )
    
    return function cleanup(){
        console.log("unsubbing from", id)
        cable.current = null
        subscription.unsubscribe()
    }
    }, [id, messages])

    if(conversations.length > 0 && user){
    const conversation = conversations.find((conversation) => conversation.id == id)
    
    let userDisplayed 
    if (user.id === conversation.author_id) {userDisplayed = conversation.receiver} else {userDisplayed = conversation.author}

    let renderMessages 

    if (messages){renderMessages = messages.map((message) => {
        return user.id === message.user_id ? (
        <div className='chatScreen_message'>
            <p className='chatScreen_textUser'> {message.body} </p>
        </div>) : (
        <div className='chatScreen_message'>
                <Avatar 
                className='chatScreen_image'
                size='sm'
                alt={user.id === conversation.author_id ? conversation.receiver.first_name : conversation.author.first_name}
                src={user.id === conversation.author_id ? conversation.receiver.avatar : conversation.author.avatar}
                />
                <p className='chatScreen_text'> {message.body} </p>
        </div>)
    })
}
        console.log(newMessageData)

    const handleChange = (e) => {
        setNewMessageData({
            user_id: user.id,
            body: e.target.value
        })
    }

    const addEmoji = (e) => {
        console.log('hi')
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setNewMessageData({
            user_id: user.id,
            body: newMessageData.body + emoji});
            setShowEmojis(false)
        };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewMessageData({user_id: user.id, body:''})
        fetch(`/conversations/${conversation.id}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessageData),
        })
    }

  return (
    <div style={{overflow: 'scroll'}}>
        <TopBar handleSignOut={handleSignOut}/>
        <Box bg="secondary"> 
            <Center>
            Conversation with {userDisplayed.first_name}
            </Center> 
        </Box>
        <div className='chatBox' >
            {renderMessages}
        </div>
        <div ref={messageLast} />
        <div className='chatScreen_input'>
            <form onSubmit={handleSubmit}>
                <FormControl onChange={handleChange}>
                    <HStack>
                        <IconButton
                            bg='secondary'
                            aria-label='Emojis'
                            size='sm'
                            icon={<CgSmile size={25}/>}
                            onClick={()=>{setShowEmojis(!showEmojis)}}
                        />
                        <Input value={newMessageData.body} variant="filled" bg="tertiary" type="body" class="form-control" id="body" placeholder="Type a message..." width={275}/>
                        <Button variant="solid" bg="secondary" type="submit" width={75} > SEND </Button>   
                    </HStack>
                        {showEmojis && (
                        <div style={{marginTop: '7px'}}>
                            <Picker onEmojiSelect={addEmoji} data={data} />
                        </div>)}
                </FormControl>
            </form>
        </div>
    </div>
  )
}}
