import React from 'react'
import TopBar from './TopBar'

export default function Messages({handleSignOut, conversations}) {

console.log(conversations)

  return (
    <div>
        <TopBar handleSignOut={handleSignOut}/>
        Messages
    </div>
  )
}
