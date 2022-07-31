import React from 'react'
import TopBar from './TopBar'

export default function Conversations({handleSignOut, conversations}) {

console.log(conversations)

  return (
    <div>
        <TopBar handleSignOut={handleSignOut}/>
        Conversations
    </div>
  )
}
