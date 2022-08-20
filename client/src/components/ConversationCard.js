import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from  '../features/user'
import { Avatar } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


export default function ConversationCard({id, author, receiver, messages}) {

    const user = useSelector(selectUser)

    let lastMessage 
    if(messages) {lastMessage = messages[messages.length - 1]}
    let renderMessage
    if (lastMessage){renderMessage = lastMessage.body}

    let userDisplayed 
    if (user.id == author.id) {userDisplayed = receiver} else {userDisplayed = author}

  return (
    <Link to={`/messages/${id}`}>
      <div className="chat">
        <Avatar className='chat_image' src={ userDisplayed.avatar } />
          <div className='chat_details'>
            <h2> {userDisplayed.first_name} {' '} {userDisplayed.last_name} </h2>
            <p> {renderMessage} </p>
          </div>
      </div>
    </Link>
  )
}
