import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from  '../features/user'

export default function Home({handleSignOut}) {
  const user = useSelector((state) => state.user.value)
  // console.log(user)

  return (
    <div onClick={handleSignOut}>
      Logout
      <h5> {user ? user.username : null} </h5>
    </div>
  )
}
