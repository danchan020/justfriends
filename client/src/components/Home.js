import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from  '../features/user'

export default function Home({handleSignOut}) {
  const user = useSelector(selectUser)

  return (
    <div onClick={handleSignOut}>
      Logout
      <h5> {user.username} </h5>
    </div>
  )
}
