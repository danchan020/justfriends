import React from 'react'
import TopBar from './TopBar'

export default function Chats({handleSignOut}) {
  return (
    <div>
        <TopBar handleSignOut={handleSignOut}/>
        Chats
    </div>
  )
}
