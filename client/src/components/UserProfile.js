import React from 'react'
import {useSelector} from 'react-redux'

export default function UserProfile() {
    const user = useSelector((state) => state.user.value)

  return (
    <div>{user.username}</div>
  )
}
